from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware  # <-- IMPORT CORS AJOUTÉ ICI
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

# <-- BLOC CORS AJOUTÉ ICI POUR DÉBLOQUER LE FRONTEND REACT -->
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise le Frontend à se connecter
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Correction du bug asyncio pour MQTT
try:
    loop = asyncio.get_running_loop()
except RuntimeError:
    loop = asyncio.get_event_loop()

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

def on_message(client, userdata, msg):
    db = SessionLocal()
    try:
        data = json.loads(msg.payload.decode())
        status = predict_status(
            data["temperature"],
            data["vibration"],
            data["pressure"]
        )
        
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
        
        alert = {
            "machine_id": data["machine_id"],
            "status": status,
            "vibration": data["vibration"],
            "message": f"Statut machine: {status}"
        }
        
        asyncio.run_coroutine_threadsafe(manager.broadcast_alert(alert), loop)
    except Exception as e:
        print(f"Erreur MQTT: {e}")
    finally:
        db.close()

mqtt_client = mqtt.Client()
mqtt_client.on_message = on_message
mqtt_client.connect("localhost", 1883, 60)
mqtt_client.subscribe("factory/sensors")
mqtt_client.loop_start()

@app.get("/")
def read_root():
    return {"status": "Serveur Backend API en ligne (MQTT actif)"}

@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    return db.query(SensorData).order_by(SensorData.timestamp.desc()).limit(50).all()

@app.websocket("/ws/alerts")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)