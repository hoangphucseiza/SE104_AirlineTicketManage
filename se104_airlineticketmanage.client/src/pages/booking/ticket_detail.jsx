import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import formatMoney from "../../utils/FormatMoney";

const fakeData = {
  ticket_id: "VE001",
  flight: {
    id: "CB001",
    depart: {
      id: "HAN",
      address: "Hà Nội",
    },
    destination: {
      id: "VDH",
      address: "Quảng Bình",
    },
    depart_date: new Date("5/17/2024 10:00"),
    landing_date: new Date("5/17/2024 12:00"),
    flight_time: 120,
  },
  passenger_id: "KH001",
  passenger_name: "Nguyễn Văn A",
  passenger_phone: "0123456789",
  passenger_cmnd: "044203004881",
  booking_date: "2021-12-01 12:00:00",
  payment_date: null,
  ticket_price: 840000,
  ticket_rank_id: 2,
  ticket_rank_name: "Thương gia",
  ticket_state: "Chưa Thanh Toán",
};

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(fakeData);
  const [showCMND, setShowCMND] = useState(false);

  const [ticketRanks, setTicketRanks] = useState([]);

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

  const getTicketRankClassName = (ticketRankId) => {
    var index = ticketRanks.findIndex((rank) => rank.id === ticketRankId) + 1;
    return index !== -1 ? "rank_" + index : "";
  };

  const handleCancelTicket = () => {
    setTicket({
      ...ticket,
      ticket_state: "Đã hủy",
    });
  };

  const handleConfirmPayment = () => {
    setTicket({
      ...ticket,
      ticket_state: "Đã mua",
      payment_date: new Date(),
    });
  };

  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} tiếng ${mins} phút`;
  };

  const handleUpdateState = () => {};

  return (
    <div className="ticket_detail">
      <header className="d-flex justify-content-between align-items-center gap-2 mb-5">
        <div className="d-flex gap-2">
          <h5
            className="mb-0"
            style={{
              color: "var(--text-color-medium)",
            }}
          >
            Thông tin vé máy bay :{" "}
          </h5>
          <h5
            className="mb-0"
            style={{
              color: "var(--text-color-bold)",
            }}
          >
            {`${ticket.ticket_id} - ${ticket.passenger_name}`}
          </h5>
        </div>

        <div>
          <button
            className="btn btn_normal btn_except me-3"
            type="button"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-xmark" />
            Hủy bỏ
          </button>
          <button
            className="btn btn_normal btn_accept"
            type="submit"
            onClick={handleUpdateState}
          >
            <i className="fa-solid fa-check" />
            Xác nhận
          </button>
        </div>
      </header>
      <body className="ticket_detail_wrapper">
        <div className="ticket_detail_wrapper_left">
          <div
            style={{
              borderBottom: "2px solid var(--border-color)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="">Thông tin đặt vé</h5>
              <div>
                {ticket.ticket_state === "Chưa Thanh Toán" && (
                  <button
                    className={`btn btn_outline btn_outline_danger ms-4`}
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "16px",
                    }}
                    onClick={handleCancelTicket}
                  >
                    HỦY PHIẾU ĐẶT CHỖ
                    <i
                      className="fa-solid fa-ban ms-2"
                      style={{
                        fontSize: "16px",
                      }}
                    />
                  </button>
                )}
                {ticket.ticket_state === "Chưa Thanh Toán" &&
                  !ticket.payment_date && (
                    <button
                      className={`btn btn_outline btn_outline_success ms-4`}
                      style={{
                        padding: "0.5rem 1rem",
                        fontSize: "16px",
                      }}
                      onClick={handleConfirmPayment}
                    >
                      XÁC NHẬN THANH TOÁN
                      <i
                        className="fa-regular fa-circle-check ms-2"
                        style={{
                          fontSize: "16px",
                        }}
                      />
                    </button>
                  )}
              </div>
            </div>
            <div className="d-flex align-items-start justify-content-between mb-3">
              <div>
                <div className="mb-3">
                  <span>Ngày đặt vé: </span>
                  <span className="fw-medium ms-2">
                    {moment(ticket.booking_date).format("DD/MM/YYYY HH:mm")}
                  </span>
                </div>
                <div>
                  <span>Ngày thanh toán: </span>
                  <span className="fw-medium ms-2">
                    {ticket.payment_date
                      ? moment(ticket.payment_date).format("DD/MM/YYYY HH:mm")
                      : "Chưa thanh toán"}
                  </span>
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <span>Hạng vé: </span>
                  <p
                    className={`ms-2 mb-0 rank_ticket ${getTicketRankClassName(
                      ticket.ticket_rank_id
                    )}`}
                  >
                    {ticket.ticket_rank_name}
                  </p>
                </div>
                <div className="mb-3">
                  <span>Loại vé: </span>
                  <span className="fw-medium ms-2">
                    {ticket.ticket_state === "Chưa Thanh Toán"
                      ? "Phiếu đặt chỗ"
                      : ticket.ticket_state === "Đã mua"
                      ? "Vé máy bay"
                      : ticket.ticket_state}
                  </span>
                </div>
                <div>
                  <span>Giá vé: </span>
                  <span className="fw-medium ms-2">
                    {formatMoney(ticket.ticket_price)} {"VND"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h5 className="my-4">Thông tin chuyến bay</h5>
            <div>
              <div className="mb-3">
                <span className="me-2">Điểm đi - Điểm đến: </span>
                <span className="fw-medium">
                  {`${ticket.flight.depart.address} (${ticket.flight.depart.id})`}{" "}
                </span>
                <i className="fa-solid fa-plane mx-4" />
                <span className="fw-medium">
                  {`${ticket.flight.destination.address} (${ticket.flight.destination.id})`}{" "}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <span className="me-2">Thời gian bay: </span>

              <span>{convertMinutesToHours(ticket.flight.flight_time)}</span>
            </div>
            <div className="mb-3">
              <span className="me-2">Khởi hành: </span>

              <span>
                {" "}
                {moment(ticket.flight.depart_date).format("hh:mm, D MMMM YYYY")}
              </span>
            </div>
          </div>
        </div>

        <div className="ticket_detail_wrapper_right">
          <h5 className="mb-3">Thông tin hành khách</h5>
          <div>
            <span>Mã HK: </span>
            <input
              className="form-control"
              readOnly
              value={ticket.passenger_id}
            />
          </div>
          <div>
            <span>Họ tên: </span>
            <input
              className="form-control"
              readOnly
              value={ticket.passenger_name}
            />
          </div>
          <div>
            <span>Số điện thoại: </span>
            <input
              className="form-control"
              readOnly
              value={ticket.passenger_phone}
            />
          </div>
          <div>
            <span>CMND: </span>
            <div className="position-relative d-inline">
              <input
                className="form-control"
                readOnly
                type={showCMND ? "text" : "password"}
                value={ticket.passenger_cmnd}
              />
              <div
                className="position-absolute"
                style={{
                  top: "50%",
                  right: "12px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setShowCMND(!showCMND)}
              >
                {showCMND ? (
                  <i className="fa-solid fa-eye-slash" />
                ) : (
                  <i className="fa-solid fa-eye" />
                )}
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default TicketDetail;
