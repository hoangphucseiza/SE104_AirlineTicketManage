import React from 'react';

const TicketClassList = ({ ticketClasses, setTicketClasses, flight }) => {
  const handleAddClass = () => {
    // Calculate the ticket class price based on the flight ticket price and the price ratio
    const updatedTicketClasses = [...ticketClasses, { maHV: '', tenHV: '', soLuong: 0, tiLeGia: 0, giaHV: flight.giaVe * flight.tiLeGia }];
    setTicketClasses(updatedTicketClasses);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedClasses = [...ticketClasses];
    updatedClasses[index][name] = value;
    setTicketClasses(updatedClasses);
  };

  return (
    <div className="stopover-list">
      <h5 className="mb-4">Danh sách hạng vé</h5>
      <div className="airport_content">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mã hạng vé</th>
              <th scope="col">Tên hạng vé</th>
              <th scope="col">Số lượng vé</th>
              <th scope="col">Tỉ lệ giá</th>
              <th scope="col">Giá hạng vé</th>
            </tr>
          </thead>
          <tbody>
            {ticketClasses.map((ticketClass, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ticketClass.maHV}</td>
                <td>{ticketClass.tenHV}</td>
                <td>
                  <input
                    className="form-control"
                    type="number"
                    name="soLuong"  
                    value={ticketClass.soLuong}
                    onChange={(e) => handleChange(index, e)}
                  />
                </td>
                <td>{ticketClass.tiLeGia}</td>
                <td>{ticketClass.giaHV}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TicketClassList;