import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ThemeSwitcher from '../components/ThemeSwitcher';
import AccountSettings from '../components/AccountSettings';

function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h2>ตั้งค่า</h2>
      <div style={{ borderBottom: '1px solid #eee', margin: '16px 0' }}>
        <ThemeSwitcher />
      </div>
      <div style={{ borderBottom: '1px solid #eee', margin: '16px 0' }}>
        <AccountSettings />
      </div>
      {user?.role === 'admin' && (
        <div>
          <h3>ตั้งค่าผู้ดูแลระบบ (Admin)</h3>
          <ul>
            <li><a href="/admin/customize-form">ตกแต่งหน้ากรอกลงทะเบียน</a></li>
            <li><a href="/admin/webhook-settings">ตั้งค่า Webhook</a></li>
            <li><a href="/admin/manage-data">จัดการข้อมูล</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default SettingsPage;