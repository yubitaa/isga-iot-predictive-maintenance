import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { AlertTriangle, Activity, Clock, Zap, Settings, Bell, TrendingUp, Server } from 'lucide-react';

function App() {
  const [data, setData] = useState([]);
  const [alertInfo, setAlertInfo] = useState(null); // Sminaha alertInfo bach matkheletch m3a fonction alert() dyal navigateur
  const [stats, setStats] = useState({
    avgVibration: 0,
    maxVibration: 0,
    totalReadings: 0,
    uptime: '99.9%'
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);
      
      const newDataPoint = {
        time: new Date().toLocaleTimeString('fr-FR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        vibration: parseFloat(incomingData.vibration),
        status: incomingData.status
      };

      setData(prevData => {
        const newData = [...prevData.slice(-19), newDataPoint];
        
        // Calculate stats
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
        sendSmsAlert(incomingData);
      } else {
        setAlertInfo(null);
      }
    };

    return () => ws.close();
  }, []);

  const sendSmsAlert = (info) => {
    console.log(`📱 [TWILIO API] SMS Envoyé ! Alerte sur la machine ${info["machine id"]} - Vibration: ${info.vibration}`);
  };

  const getStatusColor = (status) => {
    if (status === 'CRITICAL') return '#ef4444';
    if (status === 'WARNING') return '#f59e0b';
    return '#10b981';
  };

  const currentStatus = alertInfo ? 'CRITICAL' : data.length > 0 ? 'NORMAL' : 'LOADING';
  const statusColor = getStatusColor(currentStatus);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      padding: '24px',
      color: '#e2e8f0'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        padding: '0 8px'
      }}>
        <div>
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
            Surveillance IoT en temps réel • Machine {alertInfo ? alertInfo["machine id"] : 'M-001'}
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '20px',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: statusColor,
              boxShadow: `0 0 12px ${statusColor}`,
              animation: currentStatus === 'CRITICAL' ? 'pulse 1s infinite' : 'none'
            }} />
            <span style={{ fontSize: '12px', fontWeight: '600', color: statusColor }}>
              {currentStatus}
            </span>
          </div>
          
          {/* Bouton Cloche */}
          <button 
            onClick={() => alert("🔔 Notifications : Vous n'avez aucune nouvelle alerte.")}
            style={{
            padding: '10px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '12px',
            color: '#e2e8f0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bell size={20} />
          </button>
          
          {/* Bouton Paramètres */}
          <button 
            onClick={() => alert("⚙️ Paramètres : Le panneau de configuration sera bientôt disponible.")}
            style={{
            padding: '10px',
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '12px',
            color: '#e2e8f0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Critical Alert Banner */}
      {alertInfo && (
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
              Machine <strong>{alertInfo["machine id"]}</strong> • Vibration anormale: <strong>{alertInfo.vibration}</strong> • SMS envoyé
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
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {[
          { icon: Activity, label: 'Vibration Moyenne', value: stats.avgVibration, unit: 'mm/s', color: '#60a5fa' },
          { icon: TrendingUp, label: 'Vibration Max', value: stats.maxVibration, unit: 'mm/s', color: '#a78bfa' },
          { icon: Server, label: 'Points de Données', value: stats.totalReadings, unit: '', color: '#34d399' },
          { icon: Zap, label: 'Uptime Système', value: stats.uptime, unit: '', color: '#fbbf24' }
        ].map((stat, idx) => (
          <div key={idx} style={{
            background: 'rgba(30, 41, 59, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
          }} onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
          }} onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: `${stat.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <stat.icon size={20} color={stat.color} />
              </div>
              <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#f1f5f9' }}>
              {stat.value}<span style={{ fontSize: '14px', color: '#64748b', marginLeft: '4px' }}>{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{
              margin: '0 0 4px 0',
              fontSize: '18px',
              fontWeight: '600',
              color: '#f1f5f9'
            }}>
              Analyse des Vibrations
            </h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>
              Données en temps réel • Dernières 20 mesures
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{
              padding: '6px 12px',
              backgroundColor: 'rgba(96, 165, 250, 0.15)',
              color: '#60a5fa',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Clock size={14} /> Live
            </span>
          </div>
        </div>

        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height={400} minWidth={0}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVibration" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(148, 163, 184, 0.1)" 
                vertical={false}
              />
              <XAxis 
                dataKey="time" 
                stroke="#475569"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b' }}
              />
              <YAxis 
                domain={[0, 10]} 
                stroke="#475569"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#64748b' }}
                tickFormatter={(value) => `${value} mm/s`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.4)'
                }}
                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                itemStyle={{ color: '#60a5fa', fontWeight: '600' }}
                formatter={(value) => [`${value} mm/s`, 'Vibration']}
              />
              <Area 
                type="monotone" 
                dataKey="vibration" 
                stroke="#60a5fa" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorVibration)"
                isAnimationActive={false}
                dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4, stroke: '#0f172a' }}
                activeDot={{ r: 6, fill: '#a78bfa', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 8px',
        color: '#475569',
        fontSize: '12px'
      }}>
        <span>Dernière mise à jour: {data.length > 0 ? data[data.length - 1].time : '--:--:--'}</span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;