import time
import json
import random
from datetime import datetime, timezone
import paho.mqtt.client as mqtt

# 1. Config for your Docker Mosquitto Broker
BROKER = "localhost"
PORT = 1883
TOPIC = "factory/sensors"

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print(" Connecté au Broker MQTT avec succès!")
    else:
        print(f" Échec de la connexion, code: {rc}")

# 2. Setup the connection
client = mqtt.Client()
client.on_connect = on_connect
client.connect(BROKER, PORT, 60)
client.loop_start()

print(" Démarrage du Simulateur IoT... Appuyez sur Ctrl+C pour arrêter.")

try:
    while True:
        # 3. Generating data respecting CONTRAT 1
        payload = {
            "machine_id": "M-01",
            "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "temperature": round(random.uniform(50.0, 70.0), 1),
            "vibration": round(random.uniform(1.0, 3.5), 1),  # Normal vibration
            "pressure": round(random.uniform(1.0, 1.5), 1)
        }
        
        # 10% chance to simulate a CRITICAL anomaly for the AI to catch later
        if random.random() < 0.1:
            payload["vibration"] = round(random.uniform(6.0, 10.0), 1) 
            
        json_payload = json.dumps(payload)
        
        # 4. Publish to MQTT
        client.publish(TOPIC, json_payload)
        print(f"📡 Données envoyées: {json_payload}")
        
        # Wait 1 second before sending the next one
        time.sleep(1)
        
except KeyboardInterrupt:
    print("\n Simulateur arrêté par l'utilisateur.")
    client.loop_stop()
    client.disconnect()