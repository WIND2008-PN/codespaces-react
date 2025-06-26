import React from 'react';
import AdminSetting from '../components/AdminSetting';
import AdminCustomizeForm from '../components/AdminCustomizeForm';
import AdminWebhookSettings from '../components/AdminWebhookSettings';
import AdminManageData from '../components/AdminManageData';

function Admin() {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <AdminSetting />
      <AdminCustomizeForm />
      <AdminWebhookSettings />
      <AdminManageData />
    </div>
  );
}
export default Admin;