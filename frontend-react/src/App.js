import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { AlertTriangle, Activity, Zap, Settings, Bell, Thermometer, Gauge, Clock } from 'lucide-react';

<<<<<<< HEAD
// ==========================================
// COMPOSANT : LISTE DES NOTIFICATIONS (MOCK DATA)
// ==========================================
function NotificationsList() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Faux JSON fourni par le Tech Lead pour tester l'affichage
  const mockData = [
    { "temperature": 53.4, "machine_id": "M-01", "id": 35, "status": "CRITICAL", "vibration": 2.7, "pressure": 1.3, "timestamp": "2026-05-12T12:28:58.706430" },
    { "temperature": 60.5, "machine_id": "M-01", "id": 44, "status": "NORMAL", "vibration": 1.2, "pressure": 1.1, "timestamp": "2026-05-12T12:29:07.719258" },
    { "temperature": 51.8, "machine_id": "M-01", "id": 41, "status": "CRITICAL", "vibration": 3.3, "pressure": 1.4, "timestamp": "2026-05-12T12:29:04.716530" },
    { "temperature": 65.1, "machine_id": "M-02", "id": 52, "status": "CRITICAL", "vibration": 4.1, "pressure": 1.8, "timestamp": "2026-05-12T12:40:22.500000" }
  ];

  useEffect(() => {
    // ⚠️ LE JOUR DE L'INTÉGRATION : Supprime ce setTimeout et décommente le fetch ci-dessous
    setTimeout(() => {
      const criticalAlerts = mockData.filter(item => item.status === "CRITICAL");
      const sortedAlerts = criticalAlerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setAlerts(sortedAlerts);
      setLoading(false);
    }, 500);

    /* --- VRAI APPEL BACKEND (À activer chez ton collègue) ---
    fetch('http://localhost:8000/history')
      .then(res => res.json())
      .then(data => {
        const criticalAlerts = data.filter(item => item.status === "CRITICAL");
        setAlerts(criticalAlerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        setLoading(false);
      })
      .catch(err => { console.error("Erreur Backend:", err); setLoading(false); });
    */
  }, []);

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}><Activity size={32} style={{ animation: 'spin 2s linear infinite', margin: '0 auto' }} /><p>Chargement...</p></div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
      {alerts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#94a3b8' }}>Aucune alerte critique enregistrée.</p>
      ) : (
        alerts.map((alert) => (
          <div key={alert.id} style={{ backgroundColor: 'rgba(220, 38, 38, 0.05)', borderLeft: '4px solid #ef4444', borderTop: '1px solid rgba(239, 68, 68, 0.2)', borderRight: '1px solid rgba(239, 68, 68, 0.2)', borderBottom: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '0 12px 12px 0', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '250px' }}>
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '50%' }}><AlertTriangle size={24} color="#ef4444" /></div>
              <div>
                <h4 style={{ margin: 0, color: '#f8fafc', fontSize: '16px', fontWeight: 'bold' }}>Machine {alert.machine_id}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}><Clock size={14} /><span>{formatDate(alert.timestamp)}</span></div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}><Thermometer size={14} color="#f87171" /><span>Température</span></div><span style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '16px' }}>{alert.temperature} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>°C</span></span></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}><Activity size={14} color="#60a5fa" /><span>Vibration</span></div><span style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '16px' }}>{alert.vibration} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>mm/s</span></span></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}><div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}><Gauge size={14} color="#34d399" /><span>Pression</span></div><span style={{ color: '#f8fafc', fontWeight: 'bold', fontSize: '16px' }}>{alert.pressure} <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>bar</span></span></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ==========================================
// COMPOSANT : DASHBOARD (Page Principale)
// ==========================================
function Dashboard() {
  const [data, setData] = useState([]);
  const [alertInfo, setAlertInfo] = useState(null);
  const [stats, setStats] = useState({ avgVibration: 0, maxVibration: 0, uptime: '99.9%' });
  const navigate = useNavigate();

  useEffect(() => {
    // ⚠️ LE JOUR DE L'INTÉGRATION : Remplace 'ws://localhost:8080' par 'ws://localhost:8000/ws/alerts'
    const ws = new WebSocket('ws://localhost:8080'); 
=======
function App() {
  const [data, setData] = useState([]);
  const [alertInfo, setAlertInfo] = useState(null);
  const [stats, setStats] = useState({
    avgVibration: 0,
    maxVibration: 0,
    totalReadings: 0,
    uptime: '99.9%'
  });

  useEffect(() => {
    // FIX 1: Pointing to YOUR actual backend WebSocket route and port
    const ws = new WebSocket('ws://localhost:8000/ws/alerts');
>>>>>>> 80391e5bfe13316578f7dbaba9ff6d9a5a2f9747

    ws.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);
      
      // PARSING STRICT SELON LE CONTRAT JSON DU TECH LEAD
      const newDataPoint = {
        time: new Date(incomingData.timestamp || new Date()).toLocaleTimeString('fr-FR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        vibration: parseFloat(incomingData.vibration),
        temperature: parseFloat(incomingData.temperature), // Plus de simulation Math.random !
        pressure: parseFloat(incomingData.pressure),       // On lit directement l'API
        status: incomingData.status,
        machine_id: incomingData.machine_id
      };

      setData(prevData => {
        const newData = [...prevData.slice(-19), newDataPoint];
        const vibrations = newData.map(d => d.vibration);
        setStats({
          avgVibration: (vibrations.reduce((a, b) => a + b, 0) / vibrations.length).toFixed(2),
          maxVibration: Math.max(...vibrations).toFixed(2),
          uptime: '99.9%'
        });
        return newData;
      });

      if (incomingData.status === 'CRITICAL') {
        setAlertInfo(incomingData);
        sendEmailAlert(incomingData);
      } else {
        setAlertInfo(null);
      }
    };
    return () => ws.close();
  }, []);

<<<<<<< HEAD
  const sendEmailAlert = async (info) => {
    const serviceID = 'service_n4zrqjt';
    const templateID = 'template_l32f2hd';
    const publicKey = 'FgUhUSGl0nRF3djYD';
=======
  const sendSmsAlert = (info) => {
    // FIX 2: Corrected to machine_id
    console.log(`📱 [TWILIO API] SMS Envoyé ! Alerte sur la machine ${info.machine_id} - Vibration: ${info.vibration}`);
  };
>>>>>>> 80391e5bfe13316578f7dbaba9ff6d9a5a2f9747

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceID, template_id: templateID, user_id: publicKey,
          template_params: { 
            machine_id: info.machine_id, // Mise à jour pour correspondre au JSON
            vibration: info.vibration, 
            status: info.status 
          }
        })
      });
      if (response.ok) console.log("✅ Alerte réelle envoyée via EmailJS !");
    } catch (error) { console.error("❌ Erreur EmailJS:", error); }
  };

  const currentStatus = alertInfo ? 'CRITICAL' : data.length > 0 ? 'NORMAL' : 'LOADING';
  const statusColor = currentStatus === 'CRITICAL' ? '#ef4444' : '#10b981';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
<<<<<<< HEAD
          <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0, background: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Predictive Maintenance IoT</h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Machine: {alertInfo ? alertInfo.machine_id : (data.length > 0 ? data[0].machine_id : 'En attente...')}</p>
=======
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            margin: '0 0 4px 0',
            background: 'linear-gradient(90deg, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Dashboard Maintenance Prédictive
          </h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
            {/* FIX 3: Corrected to machine_id */}
            Surveillance IoT en temps réel • Machine {alertInfo ? alertInfo.machine_id : 'M-01'}
          </p>
>>>>>>> 80391e5bfe13316578f7dbaba9ff6d9a5a2f9747
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '20px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusColor }} />
            <span style={{ fontSize: '12px', fontWeight: '600', color: statusColor }}>{currentStatus}</span>
          </div>
          <button onClick={() => navigate('/notifications')} style={{ padding: '10px', backgroundColor: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', color: '#e2e8f0', cursor: 'pointer' }}><Bell size={20} /></button>
          <button onClick={() => navigate('/settings')} style={{ padding: '10px', backgroundColor: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', color: '#e2e8f0', cursor: 'pointer' }}><Settings size={20} /></button>
        </div>
      </div>

      {alertInfo && (
<<<<<<< HEAD
        <div style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', borderRadius: '16px', padding: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <AlertTriangle size={28} color="white" />
          <div>
            <h3 style={{ margin: 0, color: 'white' }}>Alerte Critique Détectée</h3>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)' }}>Vibration: {alertInfo.vibration} mm/s | E-mail envoyé</p>
=======
        <div style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
          animation: 'slideIn 0.3s ease-out',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={28} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px 0', color: 'white', fontSize: '18px', fontWeight: '700' }}>
              Alerte Critique Détectée
            </h3>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
              {/* FIX 4: Corrected to machine_id */}
              Machine <strong>{alertInfo.machine_id}</strong> • Vibration anormale: <strong>{alertInfo.vibration}</strong> • SMS envoyé
            </p>
          </div>
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'white'
          }}>
            {new Date().toLocaleTimeString('fr-FR')}
>>>>>>> 80391e5bfe13316578f7dbaba9ff6d9a5a2f9747
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { icon: Activity, label: 'Vibration', value: stats.avgVibration, unit: 'mm/s', color: '#60a5fa' },
          { icon: Thermometer, label: 'Température', value: data.length > 0 ? data[data.length-1].temperature : 0, unit: '°C', color: '#ef4444' },
          { icon: Gauge, label: 'Pression', value: data.length > 0 ? data[data.length-1].pressure : 0, unit: 'bar', color: '#10b981' },
          { icon: Zap, label: 'Uptime', value: stats.uptime, unit: '', color: '#fbbf24' }
        ].map((stat, idx) => (
          <div key={idx} style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <stat.icon size={18} color={stat.color} />
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '700' }}>{stat.value}<span style={{ fontSize: '14px', color: '#64748b' }}>{stat.unit}</span></div>
          </div>
        ))}
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '24px', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Analyse Multi-Capteurs (V, T, P)</h2>
        <div style={{ height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
              <Area type="monotone" dataKey="vibration" stroke="#60a5fa" fillOpacity={0.1} />
              <Area type="monotone" dataKey="temperature" stroke="#ef4444" fillOpacity={0.1} />
              <Area type="monotone" dataKey="pressure" stroke="#10b981" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// COMPOSANT PRINCIPAL (App avec Routing)
// ==========================================
export default function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '24px', color: '#e2e8f0' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={
            <div style={{ maxWidth: '600px', margin: 'auto', padding: '40px', backgroundColor: 'rgba(30, 41, 59, 0.6)', borderRadius: '24px', border: '1px solid rgba(148, 163, 184, 0.1)', marginTop: '50px' }}>
              <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>⚙️ Configuration Système</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><div style={{ fontWeight: '600' }}>Seuil d'alerte Vibration</div><div style={{ fontSize: '13px', color: '#94a3b8' }}>Valeur limite avant déclenchement</div></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="number" defaultValue="5.0" step="0.1" style={{ width: '80px', padding: '8px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', textAlign: 'center' }}/><span style={{ fontSize: '14px', color: '#64748b' }}>mm/s</span></div>
                </div>
                <hr style={{ border: '0.5px solid rgba(148, 163, 184, 0.1)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><div style={{ fontWeight: '600' }}>Notifications E-mail</div><div style={{ fontSize: '13px', color: '#94a3b8' }}>Via EmailJS</div></div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                </div>
                <button onClick={() => { alert("Paramètres sauvegardés localement !"); window.location.href='/'; }} style={{ marginTop: '20px', padding: '12px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Enregistrer les réglages</button>
              </div>
            </div>
          } />
          <Route path="/notifications" element={<div style={{ maxWidth: '900px', margin: 'auto' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><h2 style={{ margin: 0 }}>Centre de Notifications</h2><p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Historique des anomalies détectées</p></div><button onClick={() => window.location.href='/'} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '8px', backgroundColor: '#1e293b', color: 'white', border: '1px solid #334155' }}>Retour</button></div><NotificationsList /></div>} />
        </Routes>
      </Router>
    </div>
  );
}