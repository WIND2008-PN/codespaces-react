import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', marginTop: 40 }}>
        <Link to="/settings" className="App-link">⚙️ ตั้งค่า</Link>
        <Link to="/search" className="App-link">ค้นหาไฟล์ MicroBit</Link>
      </div>
    </div>
  );
}

export default HomePage;