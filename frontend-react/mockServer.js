const WebSocket = require('ws');

// Création du serveur WebSocket sur le port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log("🚀 Mock WebSocket Server Connecté sur ws://localhost:8080...");

wss.on('connection', function connection(ws) {
  console.log("✅ Client React connecté !");

  // Envoi des données toutes les 3 secondes
  setInterval(() => {
    const isCritical = Math.random() > 0.7; 
    
    // NOUVEAU CONTRAT JSON (Exactement comme le Backend du Tech Lead)
    const data = {
      "machine_id": "M-01",
      "status": isCritical ? "CRITICAL" : "NORMAL",
      "temperature": (50 + Math.random() * 15).toFixed(1), // Génère une fausse température
      "vibration": isCritical ? (5 + Math.random() * 3).toFixed(1) : (1 + Math.random() * 2).toFixed(1),
      "pressure": (1.1 + Math.random() * 0.4).toFixed(1), // Génère une fausse pression
      "timestamp": new Date().toISOString()
    };

    ws.send(JSON.stringify(data));
  }, 3000);
});