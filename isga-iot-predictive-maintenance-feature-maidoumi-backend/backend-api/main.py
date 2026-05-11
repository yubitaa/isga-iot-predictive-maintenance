from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
import asyncio
import json
from datetime import datetime
import paho.mqtt.client as mqtt

from database import engine, get_db, SessionLocal
from models import Base, SensorData
from ai_service import predict_status

# Crée les tables dans PostgreSQL automatiquement
Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- GESTION DES WEBSOCKETS (Pour le Frontend) ---
class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast_alert(self, alert_data: dict):
        for connection in self.active_connections:
            await connection.send_text(json.dumps(alert_data))

manager = ConnectionManager()

# --- LOGIQUE MQTT (Réception des données capteurs) ---
def on_message(client, userdata, msg):
    """Callback exécuté à chaque réception de message MQTT"""
    db = SessionLocal() # On ouvre une session manuelle ici pour le thread MQTT
    try:
        data = json.loads(msg.payload.decode())

        # 1. Demande à l'IA le statut (Ta mission)
        status = predict_status(
            data["temperature"],
            data["vibration"],
            data["pressure"]
        )

        # 2. Sauvegarde dans PostgreSQL
        record = SensorData(
            machine_id=data["machine_id"],
            temperature=data["temperature"],
            vibration=data["vibration"],
            pressure=data["pressure"],
            status=status,
            timestamp=datetime.utcnow()
        )
        db.add(record)
        db.commit()

        # 3. Alerte via WebSocket si CRITICAL ou changement d'état
        alert = {
            "machine_id": data["machine_id"],
            "status": status,
            "vibration": data["vibration"],
            "message": f"Statut machine: {status}"
        }
        
        # Envoyer au frontend de BenSidi via le WebSocket de FastAPI
        loop = asyncio.get_event_loop()
        asyncio.run_coroutine_threadsafe(manager.broadcast_alert(alert), loop)

    except Exception as e:
        print(f"Erreur traitement MQTT: {e}")
    finally:
        db.close()

# Initialisation du client MQTT
mqtt_client = mqtt.Client()
mqtt_client.on_message = on_message
mqtt_client.connect("localhost", 1883, 60)
mqtt_client.subscribe("factory/sensors")
mqtt_client.loop_start() 

# --- ENDPOINTS API ---

@app.get("/")
def read_root():
    return {"status": "Serveur Backend API en ligne (MQTT actif)"}

@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    data = db.query(SensorData).order_by(SensorData.timestamp.desc()).limit(50).all()
    return data

@app.websocket("/ws/alerts")
async def websocket_endpoint(websocket: WebSocket):
    """Le WebSocket sert uniquement à pousser les alertes vers le Frontend"""
    await manager.connect(websocket)
    try:
        while True:
            # On garde la connexion ouverte pour le push
            await websocket.receive_text() 
    except WebSocketDisconnect:
        manager.disconnect(websocket)