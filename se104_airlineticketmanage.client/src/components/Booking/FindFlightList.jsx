import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormatMoney from "../../utils/FormatMoney";
import FlightBoard from "../FlightBoard";
import moment from "moment";

const FindFlightList = ({ flights, handleClickFlight, showFilter = true }) => {
  const [sortType, setSortType] = useState(null);
  const [ticketRanks, setTicketRanks] = useState([]);
  const sortTypes = ["Ngày khởi hành", "Giá vé", "Số ghế trống"];
  const navigate = useNavigate();

  useEffect(() => {
    const getTicketRanks = async () => {
      try {
        const fakeData = [
          { id: 1, name: "Phổ thông" },
          { id: 2, name: "Thương gia" },
        ];

        setTicketRanks(fakeData);
      } catch (error) {
        console.log(error);
      }
    };

    getTicketRanks();
  }, []);

  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} tiếng ${mins} phút`;
  };

  return (
    <div className="find_tickets_list_flight">
      {showFilter && (
        <div className="d-flex align-items-center gap-4 mb-4">
          <p
            className="mb-0"
            style={{
              color: "var(--text-color-bold)",
              fontWeight: "500",
            }}
          >
            {flights.length} kết quả
          </p>

          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle filter"
              type="button"
              data-bs-toggle="dropdown"
            >
              {`Sắp xếp theo:  ${sortType ? sortType : ""}`}
            </button>
            <ul
              className="dropdown-menu home-flight-left-filters-airports"
              style={{
                width: "100%",
              }}
            >
              {sortTypes.map((sort, index) => (
                <li key={index} onClick={() => setSortType(sort)}>
                  {sort}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Điểm đi - Điểm đến</th>
            <th
              scope="col"
              style={{
                cursor: "pointer",
              }}
            >
              Ngày khởi hành <i className="fa-solid fa-sort ms-1" />
            </th>
            <th scope="col">Thời gian bay</th>
            <th
              scope="col"
              style={{
                cursor: "pointer",
              }}
            >
              Giá vé cơ bản (VNĐ) <i className="fa-solid fa-sort ms-1" />
            </th>
            <th
              scope="col"
              style={{
                cursor: "pointer",
              }}
            >
              Số ghế trống <i className="fa-solid fa-sort ms-1" />
            </th>
            <th
              scope="col"
              style={{
                cursor: "pointer",
              }}
            >
              Số ghế đã đặt
            </th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index} onClick={() => handleClickFlight(flight)}>
              <td>{index + 1}</td>
              <td>
                <FlightBoard flight={flight} />
              </td>
              <td>{moment(flight.depart_date).format("D MMMM, YYYY")}</td>
              <td>{convertMinutesToHours(flight.flight_time)}</td>
              <td>{FormatMoney(flight.price)}</td>
              <td>{flight.capacity - flight.ticket_sold}</td>
              <td>{flight.ticket_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FindFlightList;
