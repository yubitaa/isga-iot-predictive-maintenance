import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { AlertTriangle, Activity, Zap, Settings as SettingsIcon, Bell, Thermometer, Gauge, Clock, BrainCircuit, Mail, Database, Radio, Save, ArrowLeft } from 'lucide-react';

// ==========================================
// COMPOSANT : PAGE DES PARAMÈTRES (ADMIN)
// ==========================================
function SettingsPage() {
  const navigate = useNavigate();

  const handleSave = () => {
    alert("✅ Configuration sauvegardée avec succès !\n(Simulation pour la soutenance)");
    navigate('/');
  };

  const cardStyle = { background: 'rgba(30, 41, 59, 0.6)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(148, 163, 184, 0.1)' };
  const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', marginTop: '6px', fontSize: '14px', boxSizing: 'border-box' };
  const labelStyle = { fontSize: '13px', color: '#94a3b8', fontWeight: '500' };
  const headerStyle = { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid rgba(148, 163, 184, 0.1)', paddingBottom: '12px' };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* HEADER SETTINGS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#f8fafc' }}>Administration Système</h2>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>Configuration globale de l'architecture IoT & IA</p>
        </div>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#1e293b', color: 'white', border: '1px solid #334155', borderRadius: '8px', cursor: 'pointer' }}>
          <ArrowLeft size={16} /> Retour au Dashboard
        </button>
      </div>

      {/* GRILLE 2x2 POUR LES 4 SECTIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>

        {/* 1. SECTION IA (Isolation Forest) */}
        <div style={cardStyle}>
          <div style={headerStyle}>
            <BrainCircuit color="#a78bfa" size={24} />
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '16px' }}>Modèle IA (Isolation Forest)</h3>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Taux de Contamination (Sensibilité)</label>
            <input type="number" defaultValue="0.05" step="0.01" style={inputStyle} />
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Seuils de sécurité de base :</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Temp. Max</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="number" defaultValue="70" style={inputStyle} />
                <span style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>°C</span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Vib. Max</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="number" defaultValue="5.0" step="0.1" style={inputStyle} />
                <span style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>mm/s</span>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Pres. Max</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="number" defaultValue="1.5" step="0.1" style={inputStyle} />
                <span style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>bar</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SECTION ALERTES (EmailJS) */}
        <div style={cardStyle}>
          <div style={headerStyle}>
            <Mail color="#f472b6" size={24} />
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '16px' }}>Configuration des Alertes</h3>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>E-mail Technicien de Garde</label>
            <input type="email" defaultValue="technicien.garde@isga.ma" style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Service ID (API)</label>
              <input type="password" defaultValue="service_n4zrqjt" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Template ID</label>
              <input type="password" defaultValue="template_l32f2hd" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Public Key</label>
            <input type="password" defaultValue="FgUhUSGl0nRF3djYD" style={inputStyle} />
          </div>
        </div>

        {/* 3. SECTION BASE DE DONNÉES (PostgreSQL) */}
        <div style={cardStyle}>
          <div style={headerStyle}>
            <Database color="#34d399" size={24} />
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '16px' }}>Base de Données (PostgreSQL)</h3>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
            <span style={{ color: '#10b981', fontWeight: '600', fontSize: '14px' }}>PostgreSQL : Connecté (Port 5432)</span>
          </div>
          <div>
            <label style={labelStyle}>Politique de Rétention des Données</label>
            <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}>
              <option value="30">Purger les données normales après 30 jours</option>
              <option value="90">Purger les données normales après 90 jours</option>
              <option value="all">Garder tout l'historique (Big Data)</option>
            </select>
          </div>
        </div>

        {/* 4. SECTION RÉSEAU & IOT (MQTT) */}
        <div style={cardStyle}>
          <div style={headerStyle}>
            <Radio color="#fbbf24" size={24} />
            <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '16px' }}>Réseau & Capteurs IoT</h3>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fbbf24', boxShadow: '0 0 10px #fbbf24', animation: 'pulse 2s infinite' }}></div>
            <span style={{ color: '#fbbf24', fontWeight: '600', fontSize: '14px' }}>Broker MQTT : En ligne (Port 1883)</span>
          </div>
          <div>
            <label style={labelStyle}>Fréquence d'échantillonnage</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input type="range" min="1" max="10" defaultValue="1" style={{ flex: 1, cursor: 'pointer' }} />
              <span style={{ color: '#f8fafc', fontWeight: 'bold', minWidth: '80px', textAlign: 'right' }}>1 sec</span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>1 donnée par seconde envoyée au modèle IA.</p>
          </div>
        </div>

      </div>

      {/* BOUTON SAUVEGARDE */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
          <Save size={20} /> Enregistrer la configuration
        </button>
      </div>
    </div>
  );
}

// ==========================================
// COMPOSANT : LISTE DES NOTIFICATIONS
// ==========================================
function NotificationsList() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockData = [
    { "temperature": 53.4, "machine_id": "M-01", "id": 35, "status": "CRITICAL", "vibration": 2.7, "pressure": 1.3, "timestamp": "2026-05-12T12:28:58.706430" },
    { "temperature": 60.5, "machine_id": "M-01", "id": 44, "status": "NORMAL", "vibration": 1.2, "pressure": 1.1, "timestamp": "2026-05-12T12:29:07.719258" },
    { "temperature": 51.8, "machine_id": "M-01", "id": 41, "status": "CRITICAL", "vibration": 3.3, "pressure": 1.4, "timestamp": "2026-05-12T12:29:04.716530" },
    { "temperature": 65.1, "machine_id": "M-02", "id": 52, "status": "CRITICAL", "vibration": 4.1, "pressure": 1.8, "timestamp": "2026-05-12T12:40:22.500000" }
  ];

  useEffect(() => {
    setTimeout(() => {
      const criticalAlerts = mockData.filter(item => item.status === "CRITICAL");
      const sortedAlerts = criticalAlerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setAlerts(sortedAlerts);
      setLoading(false);
    }, 500);
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
// COMPOSANT : DASHBOARD
// ==========================================
function Dashboard() {
  const [data, setData] = useState([]);
  const [alertInfo, setAlertInfo] = useState(null);
  const [stats, setStats] = useState({ avgVibration: 0, maxVibration: 0, totalReadings: 0, uptime: '99.9%' });
  const navigate = useNavigate();

  useEffect(() => {
  const ws = new WebSocket('ws://localhost:8000/ws/alerts');

    ws.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);
      const newDataPoint = {
        time: new Date(incomingData.timestamp || new Date()).toLocaleTimeString('fr-FR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        vibration: parseFloat(incomingData.vibration),
        temperature: parseFloat(incomingData.temperature), 
        pressure: parseFloat(incomingData.pressure),       
        status: incomingData.status,
        machine_id: incomingData.machine_id || incomingData["machine id"]
      };

      setData(prevData => {
        const newData = [...prevData.slice(-19), newDataPoint];
        const vibrations = newData.map(d => d.vibration);
        setStats({
          avgVibration: (vibrations.reduce((a, b) => a + b, 0) / vibrations.length).toFixed(2),
          maxVibration: Math.max(...vibrations).toFixed(2),
          totalReadings: newData.length,
          uptime: '99.9%'
        });
        return newData;
      });

      if (incomingData.status === 'CRITICAL') {
        setAlertInfo(incomingData);
      } else {
        setAlertInfo(null);
      }
    };
    return () => ws.close();
  }, []);

  const currentStatus = alertInfo ? 'CRITICAL' : data.length > 0 ? 'NORMAL' : 'LOADING';
  const statusColor = currentStatus === 'CRITICAL' ? '#ef4444' : '#10b981';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 4px 0', background: 'linear-gradient(90deg, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Dashboard Maintenance Prédictive
          </h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
            Surveillance IoT en temps réel • Machine {alertInfo ? alertInfo.machine_id || alertInfo["machine id"] : (data.length > 0 ? data[0].machine_id : 'M-01')}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '20px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusColor }} />
            <span style={{ fontSize: '12px', fontWeight: '600', color: statusColor }}>{currentStatus}</span>
          </div>
          <button onClick={() => navigate('/notifications')} style={{ padding: '10px', backgroundColor: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', color: '#e2e8f0', cursor: 'pointer' }}><Bell size={20} /></button>
          <button onClick={() => navigate('/settings')} style={{ padding: '10px', backgroundColor: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', color: '#e2e8f0', cursor: 'pointer' }}><SettingsIcon size={20} /></button>
        </div>
      </div>

      {alertInfo && (
        <div style={{ background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)', animation: 'slideIn 0.3s ease-out', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={28} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 4px 0', color: 'white', fontSize: '18px', fontWeight: '700' }}>Alerte Critique Détectée</h3>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
              Machine <strong>{alertInfo.machine_id || alertInfo["machine id"]}</strong> • Vibration anormale: <strong>{alertInfo.vibration}</strong>
            </p>
          </div>
          <div style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '12px', fontWeight: '600', color: 'white' }}>
            {new Date().toLocaleTimeString('fr-FR')}
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
          <h3 style={{ fontSize: '15px', marginBottom: '16px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}><Thermometer size={18} /> Température (°C)</h3>
          <div style={{ height: '220px' }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" vertical={false} /><XAxis dataKey="time" stroke="#64748b" fontSize={10} tick={{ fill: '#94a3b8' }} /><YAxis stroke="#64748b" fontSize={10} tick={{ fill: '#94a3b8' }} domain={['dataMin - 5', 'dataMax + 5']} /><Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} /><Area type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} fill="#ef4444" fillOpacity={0.15} isAnimationActive={false} /></AreaChart></ResponsiveContainer></div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
          <h3 style={{ fontSize: '15px', marginBottom: '16px', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}><Activity size={18} /> Vibration (mm/s)</h3>
          <div style={{ height: '220px' }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" vertical={false} /><XAxis dataKey="time" stroke="#64748b" fontSize={10} tick={{ fill: '#94a3b8' }} /><YAxis stroke="#64748b" fontSize={10} tick={{ fill: '#94a3b8' }} domain={[0, 'auto']} /><Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} /><Area type="monotone" dataKey="vibration" stroke="#60a5fa" strokeWidth={2} fill="#60a5fa" fillOpacity={0.15} isAnimationActive={false} /></AreaChart></ResponsiveContainer></div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(148, 163, 184, 0.1)' }}>
          <h3 style={{ fontSize: '15px', marginBottom: '16px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}><Gauge size={18} /> Pression (bar)</h3>
          <div style={{ height: '220px' }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" vertical={false} /><XAxis dataKey="time" stroke="#64748b" fontSize={10} tick={{ fill: '#94a3b8' }} /><YAxis stroke="#64748b" fontSize={10} tick={{ fill: '#94a3b8' }} domain={['dataMin - 0.2', 'dataMax + 0.2']} /><Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }} /><Area type="monotone" dataKey="pressure" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.15} isAnimationActive={false} /></AreaChart></ResponsiveContainer></div>
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
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', padding: '24px', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<div style={{ maxWidth: '900px', margin: 'auto' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><h2 style={{ margin: 0 }}>Centre de Notifications</h2><p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Historique des anomalies détectées</p></div><button onClick={() => window.location.href='/'} style={{ padding: '8px 16px', cursor: 'pointer', borderRadius: '8px', backgroundColor: '#1e293b', color: 'white', border: '1px solid #334155' }}>Retour</button></div><NotificationsList /></div>} />
        </Routes>
      </Router>
    </div>
  );
}