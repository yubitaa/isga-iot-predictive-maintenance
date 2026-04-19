import asyncio
import json
import websockets
from datetime import datetime
import random


# Données de test - simule le Rôle 1 (Aittouda)
async def send_mock_data():
    uri = "ws://localhost:8000/ws/alerts"

    print("🚀 Démarrage simulation données IoT...")

    async with websockets.connect(uri) as websocket:
        while True:
            # Génère des données aléatoires
            data = {
                "machine_id": "M-01",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "temperature": round(random.uniform(20, 95), 1),
                "vibration": round(random.uniform(1, 10), 1),
                "pressure": round(random.uniform(0.8, 1.5), 1)
            }

            print(f"📡 Données envoyées: {json.dumps(data)}")
            await asyncio.sleep(2)


if __name__ == "__main__":
    asyncio.run(send_mock_data())