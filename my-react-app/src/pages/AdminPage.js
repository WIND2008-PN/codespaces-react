import React, { useState } from 'react';

function AdminPage() {
  const [form, setForm] = useState({ name: '', info: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    // ส่งข้อมูลไป backend ได้ที่นี่
  };

  return (
    <div className="container">
      <h2>ฟอร์มสำหรับ Admin</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ชื่อ:</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>ข้อมูลเพิ่มเติม:</label>
          <textarea name="info" value={form.info} onChange={handleChange} required />
        </div>
        <button type="submit">บันทึก</button>
      </form>
      {submitted && <div style={{ color: 'green', marginTop: 8 }}>บันทึกข้อมูลเรียบร้อย</div>}
    </div>
  );
}

export default AdminPage;