import React from 'react';
import { useAuth } from './AuthContext';

function AccountSettings() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h4>บัญชี</h4>
      <div>สถานะ: {user ? (user.role === 'admin' ? 'Admin' : 'User') : 'ไม่ได้เข้าสู่ระบบ'}</div>
      {user && (
        <button onClick={logout} style={{ marginTop: 8 }}>ออกจากระบบ</button>
      )}
    </div>
  );
}
export default AccountSettings;