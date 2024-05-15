import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import FormatMoney from "../../utils/FormatMoney";

const fakeFlight = {
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
  price: 800000,
  capacities: [
    {
      ticket_rank_id: 1,
      ticket_rank_name: "Phổ thông",
      price_rate: 1,
      capacity: 120,
      ticket_sold: 100,
    },
    {
      ticket_rank_id: 2,
      ticket_rank_name: "Thương gia",
      price_rate: 1.05,
      capacity: 20,
      ticket_sold: 19,
    },
  ],
  transit_airports: [
    {
      id: "HAN",
      address: "Hà Nội",
    },
  ],
};

const FillInformartion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    flight_id: id,
    passenger_name: "",
    passenger_phone: "",
    passenger_cmnd: "",
    ticket_rank: {},
    ticket_price: null,
    ticket_type: null,
    booking_date: null,
    payment_date: null,
  });
  const [flight, setFlight] = useState({
    ...fakeFlight,
  });
  const [error, setError] = useState({});

  const [regulation, setRegulation] = useState({
    min_booking_time: 1,
    cancel_time: 0,
  });

  const handleChangeTicket = (e) => {
    const { name, value } = e.target;
    setTicket({
      ...ticket,
      [name]: value,
    });
  };

  const getTicketRankClassName = (ticketRankId) => {
    var index =
      flight.capacities.findIndex(
        (rank) => rank.ticket_rank_id === ticketRankId
      ) + 1;
    return index !== -1 ? "rank_" + index : "";
  };

  const handleChooseTicket = (capacity) => {
    if (capacity.ticket_sold !== capacity.capacity) {
      setTicket({
        ...ticket,
        ticket_rank: capacity,
        ticket_price: Math.round(capacity.price_rate * flight.price),
      });
    }
  };

  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} tiếng ${mins} phút`;
  };

  const checkOverBookingTime = useCallback(() => {
    const bookingDate = new Date();

    if (
      bookingDate.getTime() >
      flight.depart_date.getTime() -
        regulation.min_booking_time * 24 * 60 * 60 * 1000
    ) {
      return false;
    }
    return true;
  }, [flight.depart_date, regulation.min_booking_time]);

  useEffect(() => {
    if (!checkOverBookingTime()) {
      setTicket({ ...ticket, ticket_type: 1 });
    }
  }, [checkOverBookingTime, ticket]);

  const handleBuyTicket = (e) => {
    e.preventDefault();

    const newError = {};

    if (!ticket.passenger_name) {
      newError.passenger_name = "*Họ tên khách hàng không được để trống";
    }

    const phoneRegex = /^(?:\+?84|0)(?:\d{9}|\d{8})$/;

    if (!ticket.passenger_phone) {
      newError.passenger_phone = "*Số điện thoại không được để trống";
    } else if (!phoneRegex.test(ticket.passenger_phone)) {
      newError.passenger_phone = "*Số điện thoại không hợp lệ";
    }

    const citizenIDRegex = /^\d{12}$/;

    if (!ticket.passenger_cmnd) {
      newError.passenger_cmnd = "*Chứng minh nhân dân không được để trống";
    } else if (!citizenIDRegex.test(ticket.passenger_cmnd)) {
      newError.passenger_cmnd = "*Chứng minh nhân dân không hợp lệ";
    }

    if (!ticket.ticket_rank.ticket_rank_id) {
      newError.ticket_rank = "*Vui lòng chọn hạng vé";
    }

    if (ticket.ticket_type === null) {
      newError.ticket_type = "*Vui lòng chọn loại vé";
    }

    if (Object.keys(newError).length > 0) return setError(newError);
    else setError({});

    const ticketData = {
      ...ticket,
      booking_date: new Date(),
      ticket_rank: ticket.ticket_rank.ticket_rank_id,
      payment_date: ticket.ticket_type === 1 ? new Date() : null,
    };

    console.log(ticketData);
  };

  return (
    <div className="find_tickets">
      <div className="mb-5 find_tickets_header">
        <div
          style={{
            padding: "16px 24px",
          }}
        >
          <p
            className="mb-2"
            style={{
              color: "var(--text-color-bold)",
            }}
          >
            Dữ liệu cá nhân của Quý khách thu thập trên trang này được xử lý và
            lưu trữ bởi Dreamers Airlines cho mục đích và theo điều kiện đã được
            công bố tại Chính sách bảo mật thông tin của Dreamers Airlines.
          </p>
          <p
            className="mb-1"
            style={{
              color: "var(--text-color-bold)",
            }}
          >
            Để tìm hiểu thêm về việc cách thức xử lý dữ liệu cá nhân của Quý
            khách và về các quyền của Quý khách (Quyền yêu cầu cung cấp thông
            tin, Quyền sửa đổi thông tin…), vui lòng đọc và chấp nhận{" "}
            <span
              style={{
                color: "var(--primary-color)",
                cursor: "pointer",
              }}
            >
              Chính sách bảo mật thông tin của chúng tôi.
            </span>
          </p>
        </div>
      </div>
      <div>
        <h5 className="mb-3">Thông tin Hành Khách</h5>
        <div className="find_tickets_wrapper">
          <div className="find_tickets_wrapper_left">
            <header>
              <h6 className="mb-0">NGƯỜI LỚN 1 </h6>
              <span>(NGƯỜI LỚN)</span>
            </header>
            <body>
              <small className="d-block my-3">
                Lưu ý: *Trường bắt buộc nhập thông tin
              </small>
              <h6 className="mb-3">THÔNG TIN CƠ BẢN </h6>
              <div className="d-flex mb-4 flex-wrap justify-content-between">
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="flightId"
                    readOnly
                    value={ticket.flight_id}
                    disabled
                  />
                  <label htmlFor="flightId">Mã chuyến bay</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="passengerName"
                    name="passenger_name"
                    value={ticket.passenger_name}
                    onChange={handleChangeTicket}
                  />
                  <label htmlFor="passengerName">*Họ tên khách hàng</label>
                  <span
                    style={{
                      color: "var(--danger-color)",
                    }}
                  >
                    {error.passenger_name && error.passenger_name}
                  </span>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="passengerPhone"
                    name="passenger_phone"
                    value={ticket.passenger_phone}
                    onChange={handleChangeTicket}
                  />
                  <label htmlFor="passengerPhone">*Số điện thoại</label>
                  <span
                    style={{
                      color: "var(--danger-color)",
                    }}
                  >
                    {error.passenger_phone && error.passenger_phone}
                  </span>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="passengerCMND"
                    name="passenger_cmnd"
                    value={ticket.passenger_cmnd}
                    onChange={handleChangeTicket}
                  />
                  <label htmlFor="passengerCMND">*Chứng minh nhân dân</label>
                  <span
                    style={{
                      color: "var(--danger-color)",
                    }}
                  >
                    {error.passenger_cmnd && error.passenger_cmnd}
                  </span>
                </div>
              </div>
              <h6 className="mb-3">*THÔNG TIN HẠNG VÉ</h6>
              <div className="find_tickets_wrapper_left_tickets">
                {flight?.capacities?.map((capacity, index) => (
                  <div
                    key={index}
                    className={`mb-0 me-3  rank_ticket ${getTicketRankClassName(
                      capacity.ticket_rank_id
                    )} ${
                      capacity.ticket_sold === capacity.capacity && "disabled"
                    } `}
                    onClick={() => handleChooseTicket(capacity)}
                  >
                    {`${capacity.ticket_rank_name} - ${
                      capacity.ticket_sold === capacity.capacity
                        ? "Hết vé"
                        : `${capacity.ticket_sold}/${capacity.capacity} `
                    }`}
                    {ticket.ticket_rank.ticket_rank_id ===
                      capacity.ticket_rank_id && (
                      <i className="fa-solid fa-check ms-2" />
                    )}
                  </div>
                ))}
              </div>
              <span
                style={{
                  color: "var(--danger-color)",
                }}
                className="mt-1"
              >
                {error.ticket_rank && error.ticket_rank}
              </span>

              <h6 className="mt-5 mb-1">THÔNG TIN HÌNH THỨC ĐẶT VÉ</h6>
              <div className="">
                <p className="mb-1">
                  Lưu ý: Có thể sử dụng dịch vụ đặt chỗ chuyến bay miễn phí
                  trong thời gian quy định sau:
                </p>
                <p className="mb-0">{`+ Thời gian trễ nhất khi đặt chỗ là ${regulation.min_booking_time} ngày`}</p>
                <p className="mb-0">{`+  Phiếu đặt chỗ sẽ bị hủy ${
                  regulation.cancel_time === 0
                    ? "vào ngày khởi hành"
                    : "trước ngày khởi hành " + regulation.cancel_time + " ngày"
                }`}</p>
              </div>
              <div className="my-3">
                {checkOverBookingTime() ? (
                  <button
                    className={`btn btn_outline btn_outline_primary`}
                    onClick={() => setTicket({ ...ticket, ticket_type: 0 })}
                  >
                    ĐẶT CHỖ CHUYẾN BAY
                    {ticket.ticket_type === 0 && (
                      <i className="fa-solid fa-check ms-3" />
                    )}
                  </button>
                ) : (
                  <button
                    className={`btn btn_outline btn_outline_danger`}
                    disabled
                  >
                    ĐÃ HẾT HẠN ĐẶT CHỖ
                  </button>
                )}

                <button
                  className={`btn btn_outline btn_outline_success ms-4`}
                  onClick={() => setTicket({ ...ticket, ticket_type: 1 })}
                >
                  XÁC NHẬN THANH TOÁN
                  {ticket.ticket_type === 1 && (
                    <i className="fa-solid fa-check ms-3" />
                  )}
                </button>
                <p
                  className="mt-1"
                  style={{
                    color: "var(--danger-color)",
                  }}
                >
                  {error.ticket_type && error.ticket_type}
                </p>
              </div>
            </body>
          </div>
          <div className="find_tickets_wrapper_right">
            <header
              style={{
                borderBottom: "1px solid var(--text-color-medium)",
              }}
            >
              <h5 className="mb-0">Chi tiết chuyến bay</h5>
            </header>
            <div
              style={{
                backgroundColor: "var(--primary-color-10)",
              }}
            >
              <i
                className="fa-solid fa-plane me-3"
                style={{
                  color: "var(--primary-color)",
                }}
              />
              <span>{flight.depart.id}</span>
              <i
                className="fa-solid fa-arrow-right-long mx-2"
                style={{
                  color: "var(--primary-color)",
                }}
              />
              <span>{flight.destination.id}</span>
            </div>
            <div
              style={{
                backgroundColor: "rgba(230, 180, 65, 0.1)",
              }}
            >
              <span
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "500",
                }}
              >
                Khởi hành:{" "}
              </span>

              <span>
                {" "}
                {moment(flight.depart_date).format("hh:mm, D MMMM YYYY")}
              </span>
            </div>
            <div>
              <div>
                <span className="fw-medium">
                  {`${flight.depart.address} (${flight.depart.id})`}{" "}
                </span>
                <i className="fa-solid fa-plane mx-4" />
                <span className="fw-medium">
                  {`${flight.destination.address} (${flight.destination.id})`}{" "}
                </span>
              </div>
              <p
                style={{
                  color: "var(--text-color-medium)",
                }}
                className="my-3"
              >
                {" "}
                Thời gian bay: {convertMinutesToHours(flight.flight_time)}
                {" / "}
                {flight.transit_airports.length === 0
                  ? "Bay thẳng"
                  : flight.transit_airports.length + " điểm dừng"}
              </p>
              {flight.transit_airports.map((transit, index) => (
                <p
                  key={index}
                  style={{
                    color: "var(--primary-color)",
                  }}
                  className="mb-1"
                >
                  {`+ Điểm dừng ${index + 1}: ${transit.address} - ${
                    transit.id
                  }`}
                </p>
              ))}
            </div>
            <div
              style={{
                backgroundColor: "rgba(230, 180, 65, 0.1)",
              }}
              className="d-flex justify-content-between"
            >
              <span
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "500",
                }}
              >
                Nguời lớn x 1
              </span>

              <span
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {FormatMoney(flight.price)}
                <span className="fw-normal ms-1 fs-6">VNĐ</span>
              </span>
            </div>
            <div
              style={{
                backgroundColor: "var(--primary-color-10)",
                borderBottom: "1px solid var(--text-color-light)",
              }}
            >
              <i
                className="fa-solid fa-briefcase me-3"
                style={{
                  color: "var(--primary-color)",
                }}
              />
              <span>Dịch vụ bổ trợ</span>
            </div>
            <div
              style={{
                backgroundColor: "var(--primary-color-10)",
              }}
              className="d-flex justify-content-between"
            >
              <span
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "500",
                }}
              >
                <i className="fa-solid fa-ticket me-3" />
                Giá vé
              </span>

              <span
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {FormatMoney(ticket.ticket_price ? ticket.ticket_price : 0)}
                <span className="fw-normal ms-1 fs-6">VNĐ</span>
              </span>
            </div>
            <div
              style={{
                backgroundColor: "rgba(230, 180, 65, 0.1)",
              }}
              className="d-flex justify-content-between"
            >
              <h5
                style={{
                  color: "var(--text-color-bold)",
                }}
                className="mb-0"
              >
                Tổng tiền
              </h5>

              <span
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {FormatMoney(
                  ticket.ticket_price ? ticket.ticket_price : flight.price
                )}
                <span className="fw-normal ms-1 fs-6">VNĐ</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <form className="mt-5 mb-3 text-center">
        <button
          className="btn btn_normal btn_except me-3"
          type="button"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-angle-left" />
          QUAY LẠI
        </button>
        <button
          className="btn btn_normal btn_success"
          type="submit"
          onClick={handleBuyTicket}
        >
          <i className="fa-regular fa-credit-card" />
          MUA VÉ
        </button>
      </form>
    </div>
  );
};

export default FillInformartion;
