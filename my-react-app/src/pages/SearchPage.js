import React, { useState } from 'react';

const mockFiles = [
  { name: 'microbit-Clap-Lights.hex', size: '1,275 KB', date: '26/6/2568 20:03' },
  { name: 'microbit-music.hex', size: '1,287 KB', date: '26/6/2568 19:41' },
  { name: 'microbit-test-temsound (1).hex', size: '1,321 KB', date: '8/6/2568 18:35' },
];

function SearchPage() {
  const [query, setQuery] = useState('');

  const filteredFiles = mockFiles.filter(file =>
    file.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <h2>ค้นหาไฟล์ MicroBit</h2>
      <input
        type="text"
        placeholder="ค้นหาไฟล์..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ margin: '16px 0', padding: '8px', width: '300px' }}
      />
      <table style={{ width: '100%', background: '#222', color: '#f4f6fa', borderRadius: 8 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>ชื่อไฟล์</th>
            <th style={{ textAlign: 'left', padding: 8 }}>ขนาด</th>
            <th style={{ textAlign: 'left', padding: 8 }}>วันที่แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {filteredFiles.map((file, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #444' }}>
              <td style={{ padding: 8 }}>{file.name}</td>
              <td style={{ padding: 8 }}>{file.size}</td>
              <td style={{ padding: 8 }}>{file.date}</td>
            </tr>
          ))}
          {filteredFiles.length === 0 && (
            <tr>
              <td colSpan={3} style={{ padding: 8, textAlign: 'center', color: '#888' }}>
                ไม่พบไฟล์
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SearchPage;