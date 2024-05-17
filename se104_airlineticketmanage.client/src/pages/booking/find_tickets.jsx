import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import FindFlightList from "../../components/Booking/FindFlightList";

const fakeData = [
  {
    id:'CB001',
    depart: {
      id: "HAN",
      address: "Hà Nội",
    },
    destination: {
      id: "VDH",
      address: "Quảng Bình",
    },
    depart_date: new Date("5/4/2024 10:00"),
    landing_date: new Date("5/4/2024 12:00"),
    flight_time: 120,
    price: 800000,
    capacity: 120,
    ticket_sold: 100,
  },
  {
    id:'CB001',
    depart: {
      id: "HAN",
      address: "Hà Nội",
    },
    destination: {
      id: "VDH",
      address: "Quảng Bình",
    },
    depart_date: new Date("5/4/2024 10:00"),
    landing_date: new Date("5/4/2024 12:00"),
    flight_time: 120,
    price: 800000,
    capacity: 120,
    ticket_sold: 120,
  },
];

const FindTickets = () => {
  const location = useLocation();

  const [depart, destination, date] = location.search
    .slice(1)
    .split("&")
    .map((item) => item.split("=")[1]);

  const [flights, setFlights] = useState(fakeData);

  return (  
    <div className="find_tickets">
      <div className="mb-5 find_tickets_header">
        <h5>Chọn chuyến bay</h5>
        <p>
          Chọn chuyến bay {flights[0].depart.address} ({flights[0].depart.id}),
          Việt Nam - {flights[0].destination.address} (
          {flights[0].destination.id}), Việt Nam
        </p>
        <div>
          <p
            className="mb-2"
            style={{
              color: "var(--danger-color)",
            }}
          >
            Lưu ý: Giá dưới đây đã bao gồm thuế, phí
          </p>
          <p
            className="mb-1"
            style={{
              color: "var(--primary-color)",
            }}
          >
            + Phí dịch vụ đặc biệt
          </p>
          <p
            className="mb-0 text-decoration-underline"
            style={{
              color: "var(--primary-color)",
            }}
          >
            + Thuế, Phí, Lệ phí & Phụ thu
          </p>
        </div>
      </div>
      <div className="find_tickets_list">
        <h5 className="mb-3">Danh sách chuyến bay chiều đi</h5>
        <FindFlightList flights={flights} />
      </div>
    </div>
  );
};

export default FindTickets;
