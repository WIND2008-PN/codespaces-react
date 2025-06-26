import React, { useRef, useState } from "react";
import "./App.css";
import Login from "./Login";

const WEBHOOK_REGISTER = "https://your-api.com/api/register";
const WEBHOOK_EDIT = "https://your-api.com/api/edit";
const WEBHOOK_SEARCH = "https://your-api.com/api/search";

function App() {
  const [theme, setTheme] = useState("light");
  const [themeStrength, setThemeStrength] = useState(1); // 1 = ปกติ, 2 = เข้ม, 0.5 = อ่อน
  const [showModal, setShowModal] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [form, setForm] = useState({
    student_id: "",
    nickname: "",
    fullname: "",
    parent: "",
    address: "",
    birthday: "",
    school: "",
    phone1: "",
    phone2: "",
    line_id: "",
    status: "Active",
    extra_money: "",
  });
  const [user, setUser] = useState(null); // เพิ่ม state สำหรับผู้ใช้
  const [viewMode, setViewMode] = useState("form"); // "form" หรือ "list"
  const [allData, setAllData] = useState([]);
  const fileInputRef = useRef(null);

  // ฟังก์ชันเปลี่ยนธีม
  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleStrengthChange = (e) => {
    setThemeStrength(Number(e.target.value));
  };

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImgPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setImgPreview(null);
    }
  };

  // Form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ส่งข้อมูลไป webhook
  const sendToWebhook = async (data, endpoint) => {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setAllData((prev) => [...prev, data]);
      alert("บันทึกข้อมูลสำเร็จ");
    } catch (err) {
      alert("เกิดข้อผิดพลาด");
    }
  };

  const validateForm = () => {
    if (!form.student_id || !form.fullname || !form.nickname) {
      alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบ");
      return false;
    }
    if (form.phone1 && !/^[0-9]{9,10}$/.test(form.phone1)) {
      alert("เบอร์โทรศัพท์ไม่ถูกต้อง");
      return false;
    }
    // เพิ่ม validation อื่นๆ ตามต้องการ
    return true;
  };

  // ลงทะเบียน
  const handleRegister = () => {
    if (!validateForm()) return;
    sendToWebhook(form, WEBHOOK_REGISTER);
  };

  // แก้ไข/เพิ่ม
  const handleEdit = () => {
    if (!validateForm()) return;
    sendToWebhook(form, WEBHOOK_EDIT);
  };

  // ค้นหา
  const handleSearch = async () => {
    try {
      const res = await fetch(WEBHOOK_SEARCH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const results = await res.json();
      setSearchResults(results);
    } catch {
      setSearchResults([]);
    }
  };

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.style.setProperty("--bg-main", `rgba(35,39,47,${themeStrength})`);
      root.style.setProperty("--text-main", "#f4f6fa");
    } else {
      root.style.setProperty("--bg-main", `rgba(244,246,250,${themeStrength})`);
      root.style.setProperty("--text-main", "#222");
    }
  }, [theme, themeStrength]);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className={`container ${theme}`}>
      <header>
        <h1>ข้อมูลสมาชิก</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button type="button" onClick={handleThemeToggle}>
            เปลี่ยนโหมดสี
          </button>
          <label style={{ fontSize: 14 }}>ความเข้ม</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={themeStrength}
            onChange={handleStrengthChange}
            style={{ width: 80 }}
          />
        </div>
      </header>
      <form id="member-form" onSubmit={(e) => e.preventDefault()}>
        <div className="profile-section">
          <div className="profile-img-rect">
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <div
              id="img-preview"
              className="img-preview"
              style={
                imgPreview
                  ? {
                      backgroundImage: `url('${imgPreview}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              {!imgPreview && null}
            </div>
            <p className="img-note">ขนาด 600 x 800</p>
          </div>
          <div className="profile-info">
            <div className="form-row">
              <label>รหัสนักเรียน:</label>
              <input
                type="text"
                name="student_id"
                value={form.student_id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>ชื่อเล่น:</label>
              <input
                type="text"
                name="nickname"
                value={form.nickname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>ชื่อ-สกุล:</label>
              <input
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <label>ผู้ปกครอง:</label>
              <input
                type="text"
                name="parent"
                value={form.parent}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label>ที่อยู่:</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="profile-contact">
            <div className="form-row">
              <label>วันเกิด:</label>
              <input
                type="date"
                name="birthday"
                value={form.birthday}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label>โรงเรียนเดิม:</label>
              <input
                type="text"
                name="school"
                value={form.school}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label>เบอร์โทรศัพท์ 1:</label>
              <input
                type="text"
                name="phone1"
                value={form.phone1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label>เบอร์โทรศัพท์ 2:</label>
              <input
                type="text"
                name="phone2"
                value={form.phone2}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label>LINE ID:</label>
              <input
                type="text"
                name="line_id"
                value={form.line_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label>สถานะ:</label>
              <select
                name="status"
                value={form.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="form-row">
              <label>เงินเพิ่มเติม:</label>
              <input
                type="text"
                name="extra_money"
                value={form.extra_money}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="action-buttons">
          <button type="button" onClick={handleRegister}>
            ลงทะเบียน
          </button>
          <button type="button" onClick={handleEdit}>
            แก้ไข/เพิ่ม
          </button>
          <button type="button" onClick={() => setShowModal(true)}>
            ค้นหาข้อมูลบุคคล
          </button>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "form" ? "list" : "form")}
          >
            {viewMode === "form" ? "ดูข้อมูลทั้งหมด" : "กลับไปกรอกข้อมูล"}
          </button>
        </div>
      </form>
      {showModal && (
        <div id="search-modal" className="modal">
          <div className="modal-content">
            <span
              className="close"
              id="close-modal"
              onClick={() => setShowModal(false)}
              style={{ cursor: "pointer" }}
            >
              &times;
            </span>
            <h2>ค้นหาข้อมูลบุคคล</h2>
            <input
              type="text"
              id="search-query"
              placeholder="กรอกชื่อหรือข้อมูลที่ต้องการค้นหา"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button id="do-search" onClick={handleSearch}>
              ค้นหา
            </button>
            <div id="search-results" className="search-results">
              {Array.isArray(searchResults) && searchResults.length === 0 && (
                <p>ไม่พบข้อมูล</p>
              )}
              {Array.isArray(searchResults) &&
                searchResults.map((item, idx) => (
                  <div className="result-item" key={idx}>
                    {item.fullname} ({item.student_id})
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {viewMode === "list" && (
        <div style={{ marginTop: 32 }}>
          <h2>ข้อมูลสมาชิกทั้งหมด</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {allData.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: 16,
                  minWidth: 220,
                  background: "#fff",
                }}
              >
                <div>
                  <b>รหัส:</b> {item.student_id}
                </div>
                <div>
                  <b>ชื่อ:</b> {item.fullname}
                </div>
                <div>
                  <b>ชื่อเล่น:</b> {item.nickname}
                </div>
                <div>
                  <b>เบอร์:</b> {item.phone1}
                </div>
                {/* เพิ่มข้อมูลอื่นๆ ตามต้องการ */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
