from fastapi import FastAPI, WebSocket, Depends
from sqlalchemy.orm import Session
import asyncio
import json
from datetime import datetime

from database import engine, get_db
from models import Base, SensorData
from ai_service import predict_status

# Crée les tables dans PostgreSQL automatiquement
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "Serveur Backend API en ligne"}

@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    data = db.query(SensorData).order_by(SensorData.timestamp.desc()).limit(50).all()
    return data

@app.websocket("/ws/alerts")
async def websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db)):
    await websocket.accept()
    try:
        while True:
            # Reçoit les données du simulateur (Rôle 1)
            raw = await websocket.receive_text()
            data = json.loads(raw)

            # Demande à l'IA le statut
            status = predict_status(
                data["temperature"],
                data["vibration"],
                data["pressure"]
            )

            # Sauvegarde dans PostgreSQL
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

            # Envoie le Contrat 2 au Dashboard (Rôle 4)
            alert = {
                "machine_id": data["machine_id"],
                "status": status,
                "vibration": data["vibration"],
                "message": f"Statut machine: {status}"
            }
            await websocket.send_text(json.dumps(alert))

    except Exception as e:
        print(f"Connexion fermée : {e}")