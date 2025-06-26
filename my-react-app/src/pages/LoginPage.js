import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const { login } = useAuth();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (login(username, password)) {
      history.push('/admin');
    } else {
      setError('รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: '100%', marginBottom: 12 }}
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', marginBottom: 12 }}
          />
          <button type="submit" style={{ width: '100%' }}>เข้าสู่ระบบ</button>
        </form>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </div>
    </div>
  );
}

export default LoginPage;