import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { username, role }

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setUser({ username, role: 'admin' });
      return true;
    }
    if (username === 'user' && password === 'user123') {
      setUser({ username, role: 'user' });
      return true;
    }
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