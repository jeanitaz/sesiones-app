import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayName = user?.name || (user?.nombres ? `${user.nombres} ${user.apellidos || ''}`.trim() : '');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0d0f1a',
        color: '#f1f5f9',
        fontFamily: "'Inter', system-ui, sans-serif",
        gap: '16px',
      }}
    >
      <h1 style={{ fontSize: '28px', margin: 0 }}>
        ¡Bienvenido{displayName ? `, ${displayName}` : ''}! 🎉
      </h1>
      <p style={{ color: '#94a3b8', margin: 0 }}>{user?.email}</p>
      <button
        id="logout-btn"
        onClick={handleLogout}
        style={{
          marginTop: '12px',
          padding: '10px 28px',
          background: 'linear-gradient(135deg, #aa3bff, #7c3aed)',
          border: 'none',
          borderRadius: '10px',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}