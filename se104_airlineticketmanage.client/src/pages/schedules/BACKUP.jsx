import BoxInputAdd from "../../components/Schedules/BoxInputAdd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import React, { useState, useEffect, useContext } from 'react';
import AirportSelect from '../../components/Schedules/AirportSelect';
import StopoverList from '../../components/Schedules/StopoverList';
import TicketClassList from '../../components/Schedules/TicketClassList';


const AddSchedule = () => {
  const { setAlert } = useContext(AppContext);
  const navigate = useNavigate();

  const [flight, setFlight] = useState({
    maCB: '',
    maSBDi: '',
    maSBDen: '',
    ngayGio: '',
    thoiGianBay: 0,
    giaVe: 0,
    time_stop_min: 10,
    time_stop_max: 20,
    stopovers: [
      {
        id_airport: 'VHD',
        name: "SB Đồng Hới",
        location: "Quảng Bình",
        time_stop: 0,
        note: ""
      },
      {
        id_airport: 'VHD',
        name: "SB Đồng Hới",
        location: "Quảng Bình",
        time_stop: 0,
        note: ""
      }
    ],
    ticketClasses: [],
    tgBay_min: 30,
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newError = {};

    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const vietnameseCharacterRegex = /[^\x00-\x7F]/;

    if (!flight.maSBDi) newError.maSBDi = '*Sân bay đi không được để trống';

    if (!flight.maSBDen) newError.maSBDen = '*Sân bay đến không được để trống';
    else if (flight.maSBDen == flight.maSBDi) newError.maSBDen = '*Sân bay đến phải khác sân bay đi';

    if (!flight.ngayGio) newError.ngayGio = '*Ngày giờ bay không được để trống';
    if (flight.thoiGianBay < flight.tgBay_min) newError.thoiGianBay = '*Thời gian bay phải lớn hơn thời gian bay tối thiểu';
    if (flight.giaVe < 1000) newError.giaVe = '*Giá vé phải lớn hơn 0 VND';

    if (!flight.maCB) newError.maCB = '*Mã chuyến bay không được để trống';
    else if (flight.maCB.length < 4)
      newError.maCB = "*Mã sân bay phải có ít nhất 4 ký tự";
    else if (specialCharacterRegex.test(flight.maCB)) {
      newError.maCB = "*Mã sân bay không được chứa ký tự đặc biệt";
    } else if (vietnameseCharacterRegex.test(flight.maCB)) {
      newError.maCB = "*Mã sân bay không được chứa ký tự tiếng Việt";
    }

    flight.stopovers.forEach((stopover, index) => {
      if (stopover.time_stop === 0) {
        newError[`time_stop_${index}`] = 'Nhập vào tg dừng để kích hoạt điểm dừng';
      } else if (stopover.time_stop < flight.time_stop_min) {
        newError[`time_stop_${index}`] = 'Thời gian dừng phải lớn hơn thời gian dừng tối thiểu';
      } else if (stopover.time_stop > flight.time_stop_max) {
        newError[`time_stop_${index}`] = 'Thời gian dừng phải nhỏ hơn thời gian dừng tối đa';
      }
    });

    setError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    // Xử lý logic lưu dữ liệu flight

    console.log(flight);
  };

  return (
    <form className="flight-schedule" onSubmit={handleAdd}>
      <h5 className="mb-4">THÊM MỚI LỊCH CHUYẾN BAY</h5>

      <div className="line"></div>

      <div className="flight-schedule-content mb-4" style={{
        paddingTop: "30px",
      }}>
        <h5 className="mb-4">Thông tin chuyến bay</h5>
        <div className="airport_content_inputs">
          <div className="mb-3">
            <h6>Mã chuyến bay:</h6>
            <input
              className="form-control"
              type="text"
              name="maCB"
              value={flight.maCB}
              onChange={handleChange}
            />
            <span className="text-danger">{error.maCB}</span>
          </div>
          <div className="mb-3">
            <h6>Giá vé chuyến bay/người(VND):</h6>
            <input
              className="form-control"
              type="number"
              name="giaVe"
              value={flight.giaVe}
              onChange={handleChange}
            />
            <span className="text-danger">{error.giaVe}</span>
          </div>
          <div className="mb-3">
            <h6>Sân bay đi:</h6>
            <AirportSelect
              name="maSBDi"
              value={flight.maSBDi}
              onChange={handleChange}
            />
            <span className="text-danger">{error.maSBDi}</span>
          </div>
          <div className="mb-3">
            <h6>Sân bay đến:</h6>
            <AirportSelect
              name="maSBDen"
              value={flight.maSBDen}
              onChange={handleChange}
            />
            <span className="text-danger">{error.maSBDen}</span>
          </div>
          <div className="mb-3">
            <h6>Ngày giờ bay:</h6>
            <div>
              <p> (Ngày - Giờ)
              </p>
            </div>

            <input
              className="form-control"
              type="datetime-local"
              name="ngayGio"
              value={flight.ngayGio}
              onChange={handleChange}
            />
            <span className="text-danger">{error.ngayGio}</span>
          </div>
          <div className="mb-3">
            <h6>Thời gian bay (phút):</h6>
            <p
              style={{
                color: "var(--danger-color)",
              }}>
              ( Tối thiểu {flight.tgBay_min} phút )</p>

            <input
              className="form-control"
              type="number"
              name="thoiGianBay"
              value={flight.thoiGianBay}
              onChange={handleChange}
            />
            <span className="text-danger">{error.thoiGianBay}</span>
          </div>

        </div>
      </div>

      {/* <StopoverList
        stopovers={flight.stopovers}
        setStopovers={(newStopovers) => setFlight({ ...flight, stopovers: newStopovers })}
      /> */}

      <StopoverList flight={flight} setFlight={setFlight} />

      <TicketClassList
        ticketClasses={flight.ticketClasses}
        setTicketClasses={(newTicketClasses) => setFlight({ ...flight, ticketClasses: newTicketClasses })}
      />

      <div className="py-3 text-center">
        <button
          className="btn btn-danger me-3"
          type="button"
          onClick={() => navigate('/flights')}
        >
          Hủy bỏ
        </button>
        <button className="btn btn-success" type="submit">
          Thêm mới
        </button>
      </div>
    </form>
  );
};

export default AddSchedule;





//AirportSelect
import React, { useState, useEffect } from 'react';

const AirportSelect = ({ name, value, onChange }) => {
    const [airports, setAirports] = useState([]);
    const mockAirports = [
        {
            id: "VDH",
            name: "Sân bay Đồng Hới",
            location: "Quảng Bình"
        },
        {
            id: "DAD",
            name: "Cảng hàng không quốc tế Đà Nẵng",
            location: "Đà Nẵng"
        },
    ];

    useEffect(() => {
        setAirports(mockAirports);
    }, []);

    return (
        <div>
            <select className="form-control" name={name} value={value} onChange={onChange}>
                <option value="" disabled hidden>Chọn sân bay</option>
                {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                        {airport.name} - {airport.location}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AirportSelect;
