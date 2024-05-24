import React, { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";
import moment from "moment";

const UpdateAirPort = () => {
  const { setAlert } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [flight, setFlight] = useState({
    depart_id: "",
    destination_id: "",
    depart_date: new Date(),
    flight_time: null,
    price: null,
    transit_airports: [],
    tickets: [],
  });
  const [error, setError] = useState({});
  const [showSearchTicket, setShowSearchTicket] = useState(false);
  const [searchTicket, setSearchTicket] = useState("");
  const [searchTicketList, setSearchTicketList] = useState([]);
  const [showSearchAirport, setShowSearchAirport] = useState(false);
  const [airports, setAirports] = useState([]);

  const [constraint, setConstraint] = useState({
    min_flight_time: 120,
    number_transit_max: 2,
  });

  useEffect(() => {
    const getAirports = async () => {
      try {
        const res = await getDataAPI("api/SanBay/GetSanBayAll");

        res.data &&
          setAirports(
            res.data["$values"].map((airport) => ({
              id: airport.maSB,
              address: airport.viTri,
              transit_min: airport.tgDungMin,
              transit_max: airport.tgDungMax,
            }))
          );
      } catch (err) {
        console.log(err);
      }
    };

    getAirports();
  }, []);

  useEffect(() => {
    const getConstraint = async () => {
      try {
        if (!flight.depart_id || !flight.destination_id) return;

        const res1 = await getDataAPI(
          `api/SoSanBayDung/GetThoiGianBayToiThieu/${flight.depart_id}/${flight.destination_id}`
        );

        const res2 = await getDataAPI(
          `api/SoSanBayDung/GetSoSanBayDungMax/${flight.depart_id}/${flight.destination_id}`
        );

        setConstraint({
          number_transit_max: res2.data ? res2.data : 2,
          min_flight_time: res1.data ? res1.data : 30,
        });
      } catch (err) {
        console.log(err);
        setConstraint({
          number_transit_max: 2,
          min_flight_time: 30,
        });
      }
    };

    getConstraint();
  }, [id, flight.depart_id, flight.destination_id]);

  const desAirports = useMemo(() => {
    return airports.filter((airport) => airport.id !== flight.depart_id);
  }, [airports, flight.depart_id]);

  const transitAirport = useMemo(() => {
    return airports.filter(
      (airport) =>
        airport.id !== flight.depart_id && airport.id !== flight.destination_id
    );
  }, [airports, flight.depart_id, flight.destination_id]);

  const handleChangeDate = (date) => {
    setFlight({
      ...flight,
      depart_date: new Date(date),
    });
  };

  const handleChangeNumberTicket = (value, ticket) => {
    if (value < 0) return;

    setFlight({
      ...flight,
      tickets: flight.tickets.map((item) =>
        item.id === ticket.id ? { ...item, numbers: value } : item
      ),
    });
  };

  const handleChangeTransitTime = (value, transit) => {
    if (value < 0) return;

    setFlight({
      ...flight,
      transit_airports: flight.transit_airports.map((item) =>
        item.id === transit.id ? { ...item, transit_time: value } : item
      ),
    });
  };

  const handleSearchTicketRank = async (value) => {
    setSearchTicket(value);

    try {
      const res = await getDataAPI(`api/HangVe/GetDanhSachHangVe`);

      const data = res.data["$values"].map((item) => ({
        id: item.maHV,
        name: item.tenHV,
      }));

      setSearchTicketList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickTicket = (newTicket) => {
    setSearchTicket("");
    setSearchTicketList([]);
    setShowSearchTicket(false);

    if (flight.tickets.find((ticket) => ticket.id === newTicket.id)) {
      return setAlert({
        title: "Thêm hạng vé chuyến bay thất bại",
        data: `Hạng vé ${newTicket.id} đã tồn tại trong chuyến bay !`,
        type: "error",
      });
    }

    const newItem = {
      ...newTicket,
      numbers: 0,
      ticket_sold: 0,
    };

    setFlight({
      ...flight,
      tickets: [...flight.tickets, newItem],
    });
  };

  const handleClickAirport = (newAirport) => {
    setShowSearchAirport(false);

    if (flight.transit_airports.length >= constraint.number_transit_max) {
      return setAlert({
        title: "Thêm sân bay trung gian thất bại",
        data: `Chuyến bay từ ${flight.depart_id} đến ${flight.destination_id} chỉ được phép có tối đa ${constraint.number_transit_max} sân bay trung gian!`,
        type: "error",
      });
    }

    if (
      flight.transit_airports.find((airport) => airport.id === newAirport.id)
    ) {
      return setAlert({
        title: "Thêm sân bay trung gian thất bại",
        data: `Sân bay trung gian ${newAirport.id} đã tồn tại trong chuyến bay !`,
        type: "error",
      });
    }

    const newItem = {
      ...newAirport,
      transit_time: newAirport.transit_min,
      note: "",
    };

    setFlight({
      ...flight,
      transit_airports: [...flight.transit_airports, newItem],
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newError = {};

    if (flight.depart_id <= 0) {
      newError.depart_id = "*Sân bay đi không được để trống!";
    }

    if (flight.destination_id <= 0) {
      newError.destination_id = "*Sân bay đến không được để trống!";
    }

    if (flight.depart_date.getTime() < new Date().getTime()) {
      newError.depart_date =
        "*Ngày giờ khởi hành phải lớn hơn ngày giờ hiện tại!";
    }

    if (flight.price <= 0) {
      newError.price = "*Giá vé cơ bản phải lớn hơn 0!";
    }

    if (flight.flight_time < constraint.min_flight_time) {
      newError.flight_time = `*Thời gian bay tối thiểu cho chuyến bay từ ${flight.depart_id} đến ${flight.destination_id} là ${constraint.min_flight_time} phút!`;
    }

    if (flight.tickets.length === 0) {
      newError.tickets = "*Chuyến bay phải có ít nhất một hạng vé!";
    }

    flight.tickets.forEach((ticket) => {
      if (ticket.numbers <= 0) {
        newError[
          `ticket${ticket.id}`
        ] = `*Số lượng vé hạng vé ${ticket.id} bán ra phải lớn hơn 0!`;
      }
    });

    flight.transit_airports.forEach((airport) => {
      if (
        airport.transit_time < airport.transit_min ||
        airport.transit_time > airport.transit_max
      ) {
        newError[
          `transit${airport.id}`
        ] = `*Thời gian dừng tại sân bay trung gian ${airport.id} phải từ ${airport.transit_min} đến ${airport.transit_max} phút!`;
      }
    });

    if (Object.keys(newError).length > 0) return setError(newError);
    else setError({});

    const postData = {
      maSanBayDi: flight.depart_id,
      maSanBayDen: flight.destination_id,
      ngayGioBay: moment(flight.depart_date).format("YYYY-MM-DDTHH:mm"),
      thoiGianBay: flight.flight_time,
      giaVe: flight.price,
      sanBayDungs: flight.transit_airports.map((item) => ({
        maSB: item.id,
        thoiGianDung: item.transit_time,
        ghiChu: item.note,
      })),
      hangVes: flight.tickets.map((item) => ({
        maHangVe: item.id,
        soLuongGhe: item.numbers,
      })),
    };
    try {
      const res = await postDataAPI(
        "api/ChuyenBay/CreateLichChuyenBay",
        postData
      );

      navigate("/schedules");

      return setAlert({
        title: "Tạo lịch chuyến bay thành công",
        data: `Tạo lịch chuyến bay từ ${flight.depart_id} đến ${flight.destination_id} thành công!`,
        type: "success",
      });
    } catch (error) {
      return setAlert({
        title: "Tạo lịch chuyến abay thất bại",
        data: `Tạo lịch chuyến bay không thành công!`,
        type: "error",
      });
    }
  };

  return (
    <form className="airport" onSubmit={handleUpdate}>
      <h5
        className="mb-4 mt-1 ms-3"
        style={{
          color: "var(--text-color-bold)",
        }}
      >
        Tạo lịch chuyến bay
      </h5>

      <div className="airport_content mb-4">
        <h5 className="mb-4">Thông tin chuyến bay</h5>
        <div
          className="booking_findTickets_panel_form airport_content_inputs "
          style={{
            padding: "unset",
          }}
        >
          <div
            className="dropdown"
            style={{
              flexBasis: "45%",
            }}
          >
            <div
              className="mb-3 booking_findTickets_panel_form_input"
              data-bs-toggle="dropdown"
            >
              <h6>Sân bay đi:</h6>
              <input
                className="form-control"
                type="text"
                value={flight.depart_id}
              />
              <span
                style={{
                  color: "var(--danger-color)",
                }}
              >
                {error.depart_id && error.depart_id}
              </span>
            </div>
            <ul className="dropdown-menu">
              {airports.map((airport, index) => (
                <li
                  key={index}
                  onClick={() =>
                    setFlight({ ...flight, depart_id: airport.id })
                  }
                >
                  {airport.address} ({airport.id}), Việt Nam
                </li>
              ))}
            </ul>
          </div>
          <div
            className="dropdown"
            style={{
              flexBasis: "45%",
            }}
          >
            <div
              className="mb-3 booking_findTickets_panel_form_input"
              data-bs-toggle="dropdown"
            >
              <h6>Sân bay đến:</h6>
              <input
                className="form-control"
                type="text"
                value={flight.destination_id}
              />
              <span
                style={{
                  color: "var(--danger-color)",
                }}
              >
                {error.destination_id && error.destination_id}
              </span>
            </div>
            <ul className="dropdown-menu">
              {desAirports.map((airport, index) => (
                <li
                  key={index}
                  onClick={() =>
                    setFlight({ ...flight, destination_id: airport.id })
                  }
                >
                  {airport.address} ({airport.id}), Việt Nam
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-3">
            <h6>Ngày giờ khởi hành</h6>
            <input
              className="form-control"
              type="datetime-local"
              value={moment(flight.depart_date).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => handleChangeDate(e.target.value)}
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.depart_date && error.depart_date}
            </span>
          </div>
          <div className="mb-3">
            <h6>Thời gian bay (phút)</h6>
            <input
              className="form-control"
              type="number"
              value={flight.flight_time}
              onChange={(e) =>
                setFlight({ ...flight, flight_time: e.target.value })
              }
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.flight_time && error.flight_time}
            </span>
          </div>
          <div className="mb-3">
            <h6>Giá vé cơ bản (VNĐ)</h6>
            <input
              className="form-control"
              type="number"
              value={flight.price}
              onChange={(e) => setFlight({ ...flight, price: e.target.value })}
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.price && error.price}
            </span>
          </div>
        </div>
      </div>
      <div className="airport_content mb-4">
        <h5 className="mb-4">Danh sách hạng vé chuyến bay</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mã hạng vé</th>
              <th scope="col">Tên hạng vé</th>
              <th scope="col">Số lượng vé</th>
              <th scope="col">Số vé đã bán</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {flight?.tickets?.map((ticket, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{ticket.id}</td>
                <td>{ticket.name}</td>
                <td
                  style={{
                    maxWidth: "120px",
                  }}
                >
                  <input
                    type="number"
                    className="form-control"
                    value={ticket.numbers}
                    onChange={(e) =>
                      handleChangeNumberTicket(e.target.value, ticket)
                    }
                  />
                </td>
                <td>
                  {ticket.ticket_sold}/{ticket.numbers}
                </td>
                <td
                  style={{
                    minWidth: "100px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--danger-color)",
                    }}
                  >
                    {error[`ticket${ticket.id}`] && error[`ticket${ticket.id}`]}
                  </span>
                </td>
              </tr>
            ))}

            <tr
              style={{
                height: "50px",
              }}
            >
              {!showSearchTicket ? (
                <td
                  className="fw-medium"
                  colSpan={6}
                  style={{
                    color: "var(--primary-color)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowSearchTicket(true)}
                >
                  Thêm hạng vé chuyến bay
                </td>
              ) : (
                <td className="position-relative" colSpan={6}>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      borderRadius: "4px",
                      width: "200px",
                      border: "none",
                    }}
                    placeholder="Nhập hạng vé..."
                    autoFocus={showSearchTicket && true}
                    value={searchTicket}
                    onChange={(e) => handleSearchTicketRank(e.target.value)}
                  />
                  <div className="airport_search_airport">
                    {searchTicketList.map((ticket, index) => (
                      <div
                        className="d-flex align-items-center"
                        key={index}
                        onClick={() => handleClickTicket(ticket)}
                      >
                        <span>{`${ticket.id} - ${ticket.name}`}</span>
                      </div>
                    ))}
                  </div>
                </td>
              )}
            </tr>
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.tickets && error.tickets}
            </span>
          </tbody>
        </table>
      </div>

      <div className="airport_content">
        <h5 className="mb-4">Danh sách sân bay trung gian</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mã sân bay TG</th>
              <th scope="col">Vị trí</th>
              <th scope="col">Thời gian dừng</th>
              <th scope="col">Ghi chú</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {flight?.transit_airports?.map((airport, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{airport.id}</td>
                <td>{airport.address}</td>
                <td
                  style={{
                    maxWidth: "120px",
                  }}
                >
                  <input
                    type="number"
                    className="form-control"
                    value={airport.transit_time}
                    onChange={(e) =>
                      handleChangeTransitTime(e.target.value, airport)
                    }
                  />
                </td>
                <td
                  style={{
                    maxWidth: "120px",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    value={airport.note}
                    onChange={(e) =>
                      setFlight({
                        ...flight,
                        transit_airports: flight.transit_airports.map((item) =>
                          item.id === airport.id
                            ? { ...item, note: e.target.value }
                            : item
                        ),
                      })
                    }
                  />
                </td>
                <td
                  style={{
                    minWidth: "100px",
                  }}
                >
                  <span
                    style={{
                      color: "var(--danger-color)",
                    }}
                  >
                    {error[`transit${airport.id}`] &&
                      error[`transit${airport.id}`]}
                  </span>
                </td>
              </tr>
            ))}
            <tr
              style={{
                height: "50px",
              }}
            >
              {!showSearchAirport ? (
                <td
                  className="fw-medium"
                  colSpan={6}
                  style={{
                    color: "var(--primary-color)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowSearchAirport(true)}
                >
                  Thêm sân bay trung gian
                </td>
              ) : (
                <td className="position-relative" colSpan={6}>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      borderRadius: "4px",
                      width: "200px",
                      border: "none",
                    }}
                    placeholder="Chọn sân bay trung gian..."
                    autoFocus={showSearchTicket && true}
                  />
                  <div className="airport_search_airport">
                    {transitAirport.map((airport, index) => (
                      <div
                        className="d-flex align-items-center"
                        key={index}
                        onClick={() => handleClickAirport(airport)}
                      >
                        <span>{`${airport.id} - ${airport.address}`}</span>
                      </div>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          </tbody>
        </table>

        <div className="pb-3 pt-4 text-center">
          <button
            className="btn btn_normal btn_except me-3"
            type="button"
            onClick={() => navigate("/schedules")}
          >
            <i className="fa-solid fa-xmark" />
            Hủy bỏ
          </button>
          <button className="btn btn_normal btn_success" type="submit">
            <i className="fa-solid fa-plus" />
            Thêm
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateAirPort;
