import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DatePicker from "../DatePicker";

const fakeData = [
  {
    ticket_id: "VE001",
    flight_id: "CB001",
    passenger_id: "KH001",
    passenger_name: "Nguyễn Văn A",
    passenger_phone: "0123456789",
    booking_date: "2021-12-01 12:00:00",
    ticket_rank_id: 1,
    ticket_rank_name: "Phổ thông",
    ticket_state: "Chưa Thanh Toán",
  },
  {
    ticket_id: "VE001",
    flight_id: "CB001",
    passenger_id: "KH001",
    passenger_name: "Nguyễn Văn A",
    passenger_phone: "0123456789",
    booking_date: "2021-12-01 12:00:00",
    ticket_rank_id: 2,
    ticket_rank_name: "Thương gia",
    ticket_state: "Chưa Thanh Toán",
  },
];

const TicketList = () => {
  const [searchFlights, setSearchFlights] = useState("");
  const [filters, setFilters] = useState({
    ticket_rank: "all",
    ticket_type: "all",
    search_by: "ticket_id",
  });
  const navigate = useNavigate();

  const [ticketRanks, setTicketRanks] = useState([]);
  const searchBys = ["ticket_id", "flight_id", "passenger_name"];
  const [tickets, setTickets] = useState([]);

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

  useEffect(() => {
    setTickets([...fakeData]);
  }, []);

  const ticketTypes = [
    {
      id: 1,
      name: "Vé máy bay",
    },
    {
      id: 2,
      name: "Phiếu đặt chỗ",
    },
    {
      id: 3,
      name: "Đã hủy",
    },
  ];

  const [page, setPage] = useState(1);
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const getTicketRankClassName = (ticketRankId) => {
    var index = ticketRanks.findIndex((rank) => rank.id === ticketRankId) + 1;
    return index !== -1 ? "rank_" + index : "";
  };

  return (
    <div className="mx-4">
      <h5 className="mb-3">Tra cứu Vé máy bay</h5>
      <div className="d-flex w-100 gap-3">
        <div
          className="home-flights-left-search mb-2"
          style={{
            flex: 1,
          }}
        >
          <i className="fa-solid fa-magnifying-glass me-2" />
          <input
            placeholder="Tìm kiếm..."
            value={searchFlights}
            onChange={(e) => setSearchFlights(e.target.value)}
          />
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle filter"
            type="button"
            data-bs-toggle="dropdown"
          >
            {`Tìm kiếm theo:  ${
              filters.search_by === "ticket_id"
                ? "Mã vé"
                : filters.search_by === "flight_id"
                ? "Mã chuyến bay"
                : "Tên hành khách"
            }`}
          </button>
          <ul
            className="dropdown-menu home-flight-left-filters-airports"
            style={{
              width: "100%",
            }}
          >
            {searchBys.map((search, index) => (
              <li
                key={index}
                onClick={() => setFilters({ ...filters, search_by: search })}
              >
                {search === "ticket_id"
                  ? "Mã vé"
                  : search === "flight_id"
                  ? "Mã chuyến bay"
                  : "Tên hành khách"}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="home-flight-left-filters mb-4 mt-2">
        <h6 className="mb-0 me-3">Bộ lọc</h6>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle filter"
            type="button"
            data-bs-toggle="dropdown"
          >
            {filters.ticket_rank === "all"
              ? "Hạng vé"
              : "Hạng " + filters.ticket_rank.name}
          </button>
          <ul className="dropdown-menu home-flight-left-filters-airports">
            <li onClick={() => setFilters({ ...filters, ticket_rank: "all" })}>
              Tất cả
            </li>
            {ticketRanks.map((rank, index) => (
              <li
                key={index}
                onClick={() => setFilters({ ...filters, ticket_rank: rank })}
              >
                Hạng {rank.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle filter"
            type="button"
            data-bs-toggle="dropdown"
          >
            {filters.ticket_type === "all"
              ? "Loại vé"
              : filters.ticket_type.name}
          </button>
          <ul className="dropdown-menu home-flight-left-filters-airports">
            <li onClick={() => setFilters({ ...filters, ticket_type: "all" })}>
              Tất cả
            </li>
            {ticketTypes.map((ticket, index) => (
              <li
                key={index}
                onClick={() => setFilters({ ...filters, ticket_type: ticket })}
              >
                {ticket.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Mã vé</th>
            <th scope="col">Mã chuyến bay</th>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">Số điện thoại </th>
            <th scope="col">
              Ngày đặt vé <i className="fa-solid fa-sort ms-1" />
            </th>
            <th scope="col">
              Hạng vé <i className="fa-solid fa-sort ms-1" />
            </th>
            <th
              scope="col"
              style={{
                cursor: "pointer",
              }}
            >
              Loại vé <i className="fa-solid fa-sort ms-1" />
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr
              key={index}
              onClick={() => navigate(`/booking/ticket/${ticket.ticket_id}`)}
            >
              <td>{ticket.ticket_id}</td>
              <td>{ticket.flight_id}</td>
              <td>{ticket.passenger_name}</td>
              <td>{ticket.passenger_phone}</td>
              <td>{moment(ticket.booking_date).format("DD/MM/YYYY HH:mm")}</td>
              <td>
                <p
                  className={`mb-0 rank_ticket ${getTicketRankClassName(
                    ticket.ticket_rank_id
                  )}`}
                >
                  {ticket.ticket_rank_name}
                </p>
              </td>
              <td>
                {ticket.ticket_state === "Chưa Thanh Toán"
                  ? "Phiếu đặt chỗ"
                  : ticket.ticket_state === "Đã mua"
                  ? "Vé máy bay"
                  : ticket.ticket_state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center ">
        <p>
          Hiển thị {(page - 1) * 10 + 1} đến {page * 10} trong tổng số{" "}
          {pages.length * 10} vé máy bay
        </p>
        <div className="pagination">
          <button
            className="btn btn_page"
            disabled={page <= 1 && true}
            onClick={() => setPage(page - 1)}
          >
            Trước
          </button>
          {pages.map((id) => (
            <button
              key={id}
              className={`btn btn_page ${id === page ? "active" : ""} `}
              onClick={() => setPage(id)}
            >
              {id}
            </button>
          ))}
          <button
            className="btn btn_page"
            disabled={page >= pages.length && true}
            onClick={() => setPage(page + 1)}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketList;
