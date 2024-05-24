import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { getDataAPI, putDataAPI } from "../../utils/fetchData";
import moment from "moment";

const UpdateAirPort = () => {
  const { setAlert } = useContext(AppContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [flight, setFlight] = useState({});
  const [error, setError] = useState({});
  const [showSearchTicket, setShowSearchTicket] = useState(false);
  const [searchTicket, setSearchTicket] = useState("");
  const [searchTicketList, setSearchTicketList] = useState([]);
  const [originFlight, setOriginFlight] = useState({});

  const [constraint, setConstraint] = useState({
    min_flight_time: 120,
    number_transit_max: 2,
  });

  useEffect(() => {
    const getFlight = async () => {
      try {
        if (!id) return;
        const res = await getDataAPI(
          `api/ChuyenBay/GetLichChuyenBayByMaCB/${id}`
        );

        if (!res.data) return;

        const data = {
          id: res.data.maCB,
          depart_id: res.data.maSanBayDi,
          destination_id: res.data.maSanBayDen,
          depart_date: new Date(res.data.ngayGioBay),
          flight_time: res.data.thoiGianBay,
          price: res.data.giaVe,
          transit_airports: res.data.sanBayDungs["$values"].map((item) => ({
            id: item.maSB,
            address: item.viTri,
            transit_time: item.thoiGiandung,
            transit_min: item.thoiGianDungMin,
            transit_max: item.thoiGianDungMax,
            note: item.ghiChu,
          })),
          tickets: res.data.hangVes["$values"].map((item) => ({
            id: item.maHangVe,
            name: item.tenHangVe,
            numbers: item.soLuongGhe,
            ticket_sold: item.soVeDaBan,
          })),
        };

        setFlight(data);
        setOriginFlight(data);
      } catch (err) {
        return setAlert({
          title: "Không tìm thấy chuyến bay",
          data:
            err.response.data.message ||
            `Không tìm thấy chuyến bay có mã ${id}!`,
          type: "error",
        });
      }
    };

    getFlight();
  }, [id]);

  useEffect(() => {
    const getMinFlightTime = async () => {
      try {
        if (!id) return;

        if (!flight.depart_id || !flight.destination_id) return;

        const res = await getDataAPI(
          `api/SoSanBayDung/GetThoiGianBayToiThieu/${flight.depart_id}/${flight.destination_id}`
        );

        setConstraint((pre) => ({
          ...pre,
          min_flight_time: res.data ? res.data : 30,
        }));
      } catch (err) {
        console.log(err);
        setConstraint((pre) => ({
          ...pre,
          min_flight_time: 30,
        }));
      }
    };

    getMinFlightTime();
  }, [id, flight.depart_id, flight.destination_id]);

  const isPastFlight = () => {
    return originFlight?.depart_date?.getTime() < new Date().getTime();
  };

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
        data: `Hạng vé ${newTicket.id} đã tồn tại trong chuyến bay ${flight.id} !`,
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (isPastFlight()) {
      return setAlert({
        title: "Cập nhật chuyến bay thất bại",
        data: "Không thể cập nhật thông tin chuyến bay đã bay!",
        type: "error",
      });
    }

    const newError = {};

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

    flight.tickets.forEach((ticket) => {
      if (ticket.numbers <= ticket.ticket_sold) {
        newError[
          `ticket${ticket.id}`
        ] = `*Số lượng vé hạng vé ${ticket.id} thay đổi phải lớn hơn số vé đã được bán!`;
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
      maCB: flight.id,
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
      const res = await putDataAPI(
        "api/ChuyenBay/UpdateLichChuyenBay",
        postData
      );

      navigate("/schedules");

      return setAlert({
        title: "Cập nhật lịch chuyến bay thành công",
        data: `Cập nhật lịch chuyến bay ${flight.id} thành công!`,
        type: "success",
      });
    } catch (error) {
      return setAlert({
        title: "Cập nhật chuyến bay thất bại",
        data: `Cập nhật chuyến bay ${flight.id} không thành công!`,
        type: "error",
      });
    }
  };

  return (
    <form className="airport" onSubmit={handleUpdate}>
      <div className="d-flex  justify-content-between align-items-center mt-1 mb-4 airport_header">
        <div className="d-flex gap-2">
          <h5
            className="mb-0"
            style={{
              color: "var(--text-color-medium)",
            }}
          >
            Thông tin chuyến bay :{" "}
          </h5>
          <h5
            className="mb-0"
            style={{
              color: "var(--text-color-bold)",
            }}
          >
            {`${flight.id} - Từ ${flight.depart_id} đến ${flight.destination_id}`}
          </h5>
        </div>
        <div>
          {isPastFlight() ? (
            <button className="btn btn_normal btn_success" type="button">
              <i className="fa-solid fa-check" />
              Đã bay
            </button>
          ) : (
            <>
              <button
                className="btn btn_normal btn_except me-3"
                type="button"
                onClick={() => navigate("/schedules")}
              >
                <i className="fa-solid fa-xmark" />
                Hủy bỏ
              </button>
              <button className="btn btn_normal btn_accept" type="submit">
                <i className="fa-solid fa-check" />
                Xác nhận
              </button>
            </>
          )}
        </div>
      </div>

      <div className="airport_content mb-4">
        <h5 className="mb-4">Thông tin chuyến bay</h5>
        <div className="airport_content_inputs">
          <div className="mb-3">
            <h6>Mã chuyến bay:</h6>
            <input
              className="form-control"
              type="text"
              value={flight.id}
              readOnly
              disabled
            />
          </div>
          <div className="mb-3">
            <h6>Sân bay đi:</h6>
            <input
              className="form-control"
              type="text"
              value={flight.depart_id}
              readOnly
            />
          </div>
          <div className="mb-3">
            <h6>Sân bay đến</h6>
            <input
              className="form-control"
              type="text"
              value={flight.destination_id}
              readOnly
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.transit_min && error.transit_min}
            </span>
          </div>
          <div className="mb-3">
            <h6>Ngày giờ khởi hành</h6>
            <input
              className="form-control"
              type="datetime-local"
              value={moment(flight.depart_date).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) => handleChangeDate(e.target.value)}
              readOnly={isPastFlight()}
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
              readOnly={isPastFlight() && true}
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
              readOnly={isPastFlight() && true}
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
                    readOnly={isPastFlight() && true}
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
            {isPastFlight() === false && (
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
            )}
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
                    readOnly={isPastFlight() && true}
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
                    readOnly={isPastFlight() && true}
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
          </tbody>
        </table>
      </div>
    </form>
  );
};

export default UpdateAirPort;
