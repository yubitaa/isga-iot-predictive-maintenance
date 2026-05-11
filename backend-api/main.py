from fastapi import FastAPI, WebSocket
import asyncio
import json

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "Serveur Backend API en ligne"}

@app.websocket("/ws/alerts")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Respect strict du Contrat 2
            mock_alert = {
                "machine_id": "M-01",
                "status": "CRITICAL",
                "vibration": 5.8,
                "message": "Anomalie détectée par l'IA"
            }
            await websocket.send_text(json.dumps(mock_alert))
            await asyncio.sleep(5)  # Envoie l'alerte toutes les 5 secondes
    except Exception as e:
        print(f"Connexion fermée : {e}")