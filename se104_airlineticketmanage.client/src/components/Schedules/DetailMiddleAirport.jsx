import React from "react";

const DetailMiddleAirport = ({ listMiddleAirports }) => {
  return (
    <table className="table home-flight-left-list" style={{ backgroundColor: "#F0F2F5" }}>
      <thead>
        <tr>
          <th scope="col" style={{ fontWeight: 'bold' }}>Mã SB đi</th>
          <th scope="col">Mã SB trung gian</th>
          <th scope="col">Tên SB trung gian</th>
          <th scope="col">Vị trí SB trung gian</th>
          <th scope="col" style={{ fontWeight: 'bold' }}>Mã SB đến</th>
          <th scope="col">Thời gian dừng</th>
          <th scope="col">Ghi chú</th>
          <th scope="col">Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {listMiddleAirports.map((item, index) => (
          <tr key={index}>
            <td style={{ color: 'var(--primary-color-80)', fontWeight: 'bold' }}>{item.maSB_Di}</td>
            <td>{item.maSBTG}</td>
            <td>{item.tenSBTG}</td>
            <td>{item.vtriSBTG}</td>
            <td style={{ color: 'var(--primary-color-80)', fontWeight: 'bold' }}>{item.maSB_Den}</td>
            <td>{item.tgDung}</td>
            <td>{item.ghiChu}</td>
            <td>
              <button className={`btn ${item.trangThai === 'DỪNG' ? 'btn-success' : 'btn-danger'} action-airport-button`} type="button">
                {item.trangThai}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailMiddleAirport;