import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Activity, Thermometer, Gauge } from 'lucide-react';

export default function Notifications() {
  // 1. MOCK DATA : Simulation de la réponse API (Contrat respecté)
  const mockData = [
    {
      "temperature": 53.4,
      "machine_id": "M-01",
      "id": 35,
      "status": "CRITICAL",
      "vibration": 2.7,
      "pressure": 1.3,
      "timestamp": "2026-05-12T12:28:58.706430"
    },
    {
      "temperature": 60.5,
      "machine_id": "M-01",
      "id": 44,
      "status": "NORMAL",
      "vibration": 1.2,
      "pressure": 1.1,
      "timestamp": "2026-05-12T12:29:07.719258"
    },
    {
      "temperature": 51.8,
      "machine_id": "M-01",
      "id": 41,
      "status": "CRITICAL",
      "vibration": 3.3,
      "pressure": 1.4,
      "timestamp": "2026-05-12T12:29:04.716530"
    },
    {
      "temperature": 45.2,
      "machine_id": "M-02",
      "id": 48,
      "status": "NORMAL",
      "vibration": 0.8,
      "pressure": 1.0,
      "timestamp": "2026-05-12T12:35:10.100000"
    },
    {
      "temperature": 65.1,
      "machine_id": "M-02",
      "id": 52,
      "status": "CRITICAL",
      "vibration": 4.1,
      "pressure": 1.8,
      "timestamp": "2026-05-12T12:40:22.500000"
    },
    {
      "temperature": 58.0,
      "machine_id": "M-01",
      "id": 55,
      "status": "WARNING",
      "vibration": 2.1,
      "pressure": 1.2,
      "timestamp": "2026-05-12T12:45:00.000000"
    }
  ];

  // État pour stocker les alertes
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ==========================================
    // VRAI APPEL API (À décommenter plus tard)
    // ==========================================
    /*
    fetch('http://localhost:8000/history')
      .then(res => res.json())
      .then(data => {
        // Filtrage direct à la réception
        const criticalAlerts = data.filter(item => item.status === "CRITICAL");
        setAlerts(criticalAlerts);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération de l'historique:", err);
        setLoading(false);
      });
    */

    // ==========================================
    // UTILISATION DU MOCK DATA (Temporaire)
    // ==========================================
    // On simule un léger délai réseau de 500ms pour l'UX
    setTimeout(() => {
      const criticalAlerts = mockData.filter(item => item.status === "CRITICAL");
      // Tri par date décroissante (les plus récentes en premier)
      const sortedAlerts = criticalAlerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setAlerts(sortedAlerts);
      setLoading(false);
    }, 500);

  }, []); // Exécuté une seule fois au montage

  // Fonction utilitaire pour formater la date proprement
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#f8fafc' }}>
            Centre de Notifications
          </h2>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
            Historique des anomalies détectées
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
          <Activity size={32} style={{ animation: 'spin 2s linear infinite', margin: '0 auto' }} />
          <p>Chargement de l'historique...</p>
        </div>
      ) : alerts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '16px', border: '1px dashed #475569' }}>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>Aucune alerte critique enregistrée pour le moment.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              style={{ 
                backgroundColor: 'rgba(220, 38, 38, 0.05)', 
                borderLeft: '4px solid #ef4444',
                borderTop: '1px solid rgba(239, 68, 68, 0.2)',
                borderRight: '1px solid rgba(239, 68, 68, 0.2)',
                borderBottom: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '0 12px 12px 0', 
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
              }}
            >
              {/* Info Principale : Machine & Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '250px' }}>
                <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '50%' }}>
                  <AlertTriangle size={24} color="#ef4444" />
                </div>
                <div>
                  <h4 style={{ margin: 0, color: '#f8fafc', fontSize: '16px', fontWeight: 'bold' }}>
                    Machine {alert.machine_id}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>
                    <Clock size={14} />
                    <span>{formatDate(alert.timestamp)}</span>
                  </div>
                </div>
              </div>

              {/* Métriques lors du crash */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {/* Température */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>
                    <Thermometer size={14} color="#f87171" />
                    <span>Température</span>
                  </div>
                  <span style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '16px' }}>
                    {alert.temperature} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>°C</span>
                  </span>
                </div>

                {/* Vibration */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>
                    <Activity size={14} color="#60a5fa" />
                    <span>Vibration</span>
                  </div>
                  <span style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '16px' }}>
                    {alert.vibration} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>mm/s</span>
                  </span>
                </div>

                {/* Pression */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>
                    <Gauge size={14} color="#34d399" />
                    <span>Pression</span>
                  </div>
                  <span style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '16px' }}>
                    {alert.pressure} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>bar</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}