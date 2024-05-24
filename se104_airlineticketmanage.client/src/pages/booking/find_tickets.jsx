import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FindFlightList from "../../components/Booking/FindFlightList";
import { getDataAPI } from "../../utils/fetchData";
import moment from "moment";

import { AppContext } from "../../App";

const FindTickets = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setAlert } = useContext(AppContext);

  const [depart, destination, date] = location.search
    .slice(1)
    .split("&")
    .map((item) => item.split("=")[1]);

  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const getFlight = async () => {
      try {
        let api = "api/ChuyenBay/TimKiemChuyenBay?";

        api += `maSBDi=${destination}&`;

        api += `maSBDen=${depart}&`;

        api += `NgayKhoiHanh=${moment(date, "DD/MM/YYYY").format(
          "YYYY-MM-DDTHH:mm:ss"
        )}`;

        const res = await getDataAPI(api);

        console.log(res)

        res.data &&
          setFlights(
            res.data["$values"].map((flight) => ({
              id: flight.maCB,
              depart: {
                id: flight.sanBayDi.maSB,
                address: flight.sanBayDi.viTri,
              },
              destination: {
                id: flight.sanBayDen.maSB,
                address: flight.sanBayDen.viTri,
              },
              depart_date: new Date(flight.ngayGioBay),
              landing_date: new Date(flight.ngayGioDen),
              flight_time:
                (new Date(flight.ngayGioDen).getTime() -
                  new Date(flight.ngayGioBay).getTime()) /
                60000,
              price: flight.giaVe,
              capacity: flight.tongSoVe,
              ticket_sold: flight.soVeMua,
            }))
          );
      } catch (err) {
        console.log(err);
      }
    };

    getFlight();
  }, [date, depart, destination]);

  const handleClickFlight = (flight) => {
    if (flight.capacity === flight.ticket_sold) {
      return setAlert({
        title: "Đặt vé không thành công",
        data: `Chuyến bay ${flight.depart.id} - ${flight.destination.id} đã hết vé. Vui lòng chọn chuyến bay khác.`,
        type: "error",
      });
    }

    navigate(`/booking/find/fill/${flight.id}`);
  };

  return (
    <div className="find_tickets">
      <div className="mb-5 find_tickets_header">
        <h5>Chọn chuyến bay</h5>
        <p>
          Chọn chuyến bay {flights[0]?.depart.address} ({depart}), Việt Nam -{" "}
          {flights[0]?.destination.address} ({destination}), Việt Nam
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
        <FindFlightList
          flights={flights}
          handleClickFlight={handleClickFlight}
        />
      </div>
    </div>
  );
};

export default FindTickets;
