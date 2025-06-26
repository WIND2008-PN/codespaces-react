import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role }

  const login = (username, password) => {
    // ตัวอย่าง: รหัส admin คือ admin/admin123
    if (username === 'admin' && password === 'admin123') {
      setUser({ username, role: 'admin' });
      return true;
    }
    // เพิ่ม logic สำหรับ user อื่นๆ ได้
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}