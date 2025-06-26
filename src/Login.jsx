import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (!form.email || !form.username || !form.password || !form.confirmPassword) {
        setError("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("รหัสผ่านไม่ตรงกัน");
        return;
      }
      // สามารถเพิ่ม logic ส่งข้อมูลไป backend ได้ที่นี่
      onLogin({ username: form.username, email: form.email });
    } else {
      if (!form.email || !form.password) {
        setError("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }
      // สามารถเพิ่ม logic ตรวจสอบกับ backend ได้ที่นี่
      onLogin({ email: form.email });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card" style={{ maxWidth: 400, margin: "80px auto", padding: 24, borderRadius: 8, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center" }}>{isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: 'left', marginBottom: 16 }}>
            <label>อีเมล:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: '100%', marginBottom: 12 }}
            />
            {isRegister && (
              <>
                <label>ชื่อผู้ใช้:</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', marginBottom: 12 }}
                />
              </>
            )}
            <label>รหัสผ่าน:</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? "ซ่อน" : "แสดง"}
              </button>
            </div>
            {isRegister && (
              <>
                <label>ยืนยันรหัสผ่าน:</label>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    tabIndex={-1}
                  >
                    {showConfirm ? "ซ่อน" : "แสดง"}
                  </button>
                </div>
              </>
            )}
            {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
          </div>
          <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 4, backgroundColor: '#1976d2', color: 'white', border: 'none', cursor: 'pointer' }}>
            {isRegister ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
          </button>
        </form>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          {isRegister ? (
            <span>
              มีบัญชีอยู่แล้ว?{" "}
              <button style={{ background: "none", color: "#1976d2", border: "none", cursor: "pointer" }} onClick={() => setIsRegister(false)}>
                เข้าสู่ระบบ
              </button>
            </span>
          ) : (
            <span>
              ยังไม่มีบัญชี?{" "}
              <button style={{ background: "none", color: "#1976d2", border: "none", cursor: "pointer" }} onClick={() => setIsRegister(true)}>
                สมัครสมาชิก
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}