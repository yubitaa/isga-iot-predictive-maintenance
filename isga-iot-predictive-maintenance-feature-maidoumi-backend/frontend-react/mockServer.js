const WebSocket = require('ws');

// Création dyal serveur WebSocket f port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log("🚀 Mock WebSocket Server kheddam 3la ws://localhost:8080...");

wss.on('connection', function connection(ws) {
  console.log("✅ Client React connecté !");

  // Kolla 3 tawan, ghadi nsifto data l'React
  setInterval(() => {
    // Randome: 30% chance tkon CRITICAL bach t-testy l'alerte
    const isCritical = Math.random() > 0.7; 
    
    // Contrat 2 kima mktoub f l'cahier des charges
    const data = {
      "machine id": "M-01",
      "status": isCritical ? "CRITICAL" : "NORMAL",
      "vibration": isCritical ? (5 + Math.random() * 3).toFixed(1) : (1 + Math.random() * 2).toFixed(1),
      "message": isCritical ? "Anomalie détectée par l'IA" : "Fonctionnement normal"
    };

    ws.send(JSON.stringify(data));
  }, 3000);
});