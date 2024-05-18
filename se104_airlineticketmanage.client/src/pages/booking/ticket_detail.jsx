import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import formatMoney from "../../utils/FormatMoney";

import { getDataAPI, putDataAPI } from "../../utils/fetchData";
import { AppContext } from "../../App";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAlert } = useContext(AppContext);
  const [ticket, setTicket] = useState({});
  const [originTicket, setOriginTicket] = useState({});
  const [showCMND, setShowCMND] = useState(false);

  const [ticketRanks, setTicketRanks] = useState([]);

  useEffect(() => {
    const getTicket = async () => {
      try {
        const res = await getDataAPI(`api/VeMayBay/GetDetailByMaVe${id}`);

        const data = {
          ticket_id: res.data.maVe,
          flight: {
            id: res.data.maCB,
            depart: {
              id: res.data.sanBayDi.maSB,
              address: res.data.sanBayDi.viTri,
            },
            destination: {
              id: res.data.sanBayDen.maSB,
              address: res.data.sanBayDen.viTri,
            },
            depart_date: new Date(res.data.ngayGioBay),
            landing_date: new Date(res.data.ngayGioDen),
            flight_time:
              (new Date(res.data.ngayGioDen).getTime() -
                new Date(res.data.ngayGioBay).getTime()) /
              60000,
          },
          passenger_id: res.data.maKH,
          passenger_name: res.data.tenKH,
          passenger_phone: res.data.sdt,
          passenger_cmnd: res.data.cmnd,
          booking_date: new Date(res.data.ngayDat),
          payment_date: res.data.ngayMua ? new Date(res.data.ngayMua) : null,
          ticket_price: res.data.giaTien,
          ticket_rank_id: res.data.maHV,
          ticket_rank_name: res.data.tenHV,
          ticket_state: res.data.trangThai,
        };

        setTicket(data);
        setOriginTicket(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTicket();
  }, [id]);

  useEffect(() => {
    const getTicketRanks = async () => {
      try {
        const res = await getDataAPI(`api/HangVe/GetDanhSachHangVe`);

        const data = res.data["$values"].map((item) => ({
          id: item.maHV,
          name: item.tenHV,
        }));

        setTicketRanks(data);
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

  const isPastFlight = () => {
    return originTicket.flight?.depart_date?.getTime() < new Date().getTime();
  };

  const handleCancelTicket = () => {
    setTicket({
      ...ticket,
      ticket_state: "Đã hủy",
      payment_date: null,
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

  const handleUpdateState = async () => {
    const api = `api/VeMayBay/CapNhatTrangThaiVe?maVe=${
      ticket.ticket_id
    }&TrangThai=${ticket.ticket_state}&NgayMua=${
      ticket.payment_date
        ? moment(ticket.payment_date).format("YYYY-MM-DD HH:mm:ss")
        : moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    }`;
    try {
      const res = await putDataAPI(api);

      navigate(-1);

      return setAlert({
        title: "Cập nhật vé máy bay thành công",
        data: `Cập nhật trạng thái vé máy bay ${ticket.ticket_id} thành công!`,
        type: "success",
      });
    } catch (error) {
      return setAlert({
        title: "Cập nhật vé máy bay thất bại",
        data: `Cập nhật trạng thái vé máy bay ${ticket.ticket_id} không thành công!`,
        type: "error",
      });
    }
  };

  if (Object.keys(ticket).length === 0) return null;

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
          {originTicket.ticket_state === "Đã hủy" ? (
            <button
              className="btn btn_normal btn_except"
              type="button"
              style={{ maxWidth: "unset" }}
            >
              <i className="fa-solid fa-ban" />
              Vé đã bị hủy
            </button>
          ) : isPastFlight() ? (
            <button
              className="btn btn_normal btn_success"
              type="button"
              style={{ maxWidth: "unset" }}
            >
              <i className="fa-solid fa-check" />
              Chuyến bay đã khởi hành
            </button>
          ) : (
            originTicket.ticket_state !== "Đã mua" && (
              <>
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
              </>
            )
          )}
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
                {!isPastFlight() &&
                  originTicket.ticket_state.includes("Chưa") && (
                    <button
                      className={`btn btn_outline btn_outline_danger ms-4`}
                      style={{
                        padding: "0.5rem 1rem",
                        fontSize: "16px",
                        cursor: "pointer",
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
                {!isPastFlight() &&
                  originTicket.ticket_state.includes("Chưa") &&
                  !originTicket.payment_date && (
                    <button
                      className={`btn btn_outline btn_outline_success ms-4`}
                      style={{
                        padding: "0.5rem 1rem",
                        fontSize: "16px",
                      }}
                      cursor="pointer"
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
