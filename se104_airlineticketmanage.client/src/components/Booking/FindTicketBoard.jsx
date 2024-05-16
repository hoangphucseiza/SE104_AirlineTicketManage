import React, { useState, useMemo, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../components/DatePicker";
import Slide1 from "../../images/slide1.png";
import Slide2 from "../../images/slide2.png";
import Slide3 from "../../images/slide3.png";
import { getDataAPI } from "../../utils/fetchData";

const FindTicketBoard = () => {
  const [airports, setAirports] = useState([]);

  const [conditions, setConditions] = useState({
    depart: {
      address: null,
      id: null,
    },
    destination: {
      address: null,
      id: null,
    },
    departDate: null,
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getAirports = async () => {
      try {
        const res = await getDataAPI("api/SanBay/GetSanBayAll");

        res.data &&
          setAirports(
            res.data["$values"].map((airport) => ({
              id: airport.maSB,
              address: airport.viTri,
            }))
          );
      } catch (err) {
        console.log(err);
      }
    };

    getAirports();
  }, []);

  const desAirports = useMemo(() => {
    return airports.filter((airport) => airport.id !== conditions.depart.id);
  }, [airports, conditions.depart]);

  const handleChangeDate = (date) => {
    setConditions({
      ...conditions,
      departDate: date,
    });
  };

  const handleFindTickets = () => {
    const newError = {};

    if (!conditions.depart.id) newError.depart = "*Vui lòng chọn sân bay đi";

    if (!conditions.destination.id)
      newError.destination = "*Vui lòng chọn sân bay đến";

    if (!conditions.departDate)
      newError.departDate = "*Vui lòng chọn ngày khởi hành";

    if (Object.keys(newError).length > 0) return setError(newError);

    navigate(
      `/booking/find?depart=${conditions.depart.id}&destination=${
        conditions.destination.id
      }&date=${moment(conditions.departDate).format("DD/MM/YYYY")}`
    );
  };

  return (
    <div className="booking_findTickets">
      <div
        id="booking_carousel"
        className="carousel slide booking_findTickets_carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#booking_carousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
          ></button>
          <button
            type="button"
            data-bs-target="#booking_carousel"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#booking_carousel"
            data-bs-slide-to="2"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Slide1} className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src={Slide2} className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src={Slide3} className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#booking_carousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#booking_carousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="booking_findTickets_panel">
        <div className="booking_findTickets_panel_header">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <i
              className="fa-solid fa-arrow-right-long"
              style={{
                fontSize: "20px",
              }}
            />
            <p
              className="mb-0"
              style={{
                fontSize: "18px",
              }}
            >
              Một chiều
            </p>
          </div>
        </div>
        <div className="booking_findTickets_panel_form">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="dropdown">
              <div
                className="booking_findTickets_panel_form_input"
                data-bs-toggle="dropdown"
              >
                <p className="mb-1">Từ</p>
                <div>
                  <input
                    value={
                      conditions.depart.id
                        ? `${conditions.depart.address} (${conditions.depart.id}), Việt Nam`
                        : ""
                    }
                  />
                  <i className="fa-solid fa-chevron-right" />
                </div>
                <span
                  style={{
                    color: "var(--danger-color)",
                  }}
                >
                  {error.depart && error.depart}
                </span>
              </div>
              <ul className="dropdown-menu">
                {airports.map((airport, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      setConditions({ ...conditions, depart: airport })
                    }
                  >
                    {airport.address} ({airport.id}), Việt Nam
                  </li>
                ))}
              </ul>
            </div>
            <i
              className="fa-solid fa-arrow-right"
              style={{
                fontSize: "24px",
                color: "var(--text-color-medium)",
              }}
            />
            <div className="dropdown">
              <div
                className="booking_findTickets_panel_form_input"
                data-bs-toggle="dropdown"
              >
                <p className="mb-1">Đến</p>
                <div>
                  <input
                    value={
                      conditions.destination.id
                        ? `${conditions.destination.address} (${conditions.destination.id}), Việt Nam`
                        : ""
                    }
                  />
                  <i className="fa-solid fa-chevron-right" />
                </div>
                <span
                  style={{
                    color: "var(--danger-color)",
                  }}
                >
                  {error.destination && error.destination}
                </span>
              </div>
              <ul className="dropdown-menu">
                {desAirports.map((airport, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      setConditions({ ...conditions, destination: airport })
                    }
                  >
                    {airport.address} ({airport.id}), Việt Nam
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown">
              <div
                className="booking_findTickets_panel_form_input"
                data-bs-toggle="dropdown"
              >
                <p className="mb-1">Ngày khởi hành</p>
                <div>
                  <input
                    value={
                      conditions.departDate
                        ? moment(conditions.departDate).format("DD/MM/YYYY")
                        : ""
                    }
                  />
                  <i className="fa-regular fa-calendar" />
                </div>
                <span
                  style={{
                    color: "var(--danger-color)",
                  }}
                >
                  {error.departDate && error.departDate}
                </span>
              </div>
              <ul
                className="dropdown-menu"
                style={{
                  width: "unset",
                }}
              >
                <DatePicker
                  date={conditions.departDate}
                  onChangeDate={handleChangeDate}
                />
              </ul>
            </div>
            <div className="dropdown">
              <div className="booking_findTickets_panel_form_input">
                <p className="mb-1">Hành khách</p>
                <div>
                  <input value="1 hành khách" readOnly />
                  <i className="fa-regular fa-user" />
                </div>
              </div>
            </div>

            <div
              style={{
                textAlign: "right",
              }}
            >
              <button
                className="btn btn_normal btn_accept"
                style={{
                  maxWidth: "unset",
                  fontWeight: "400",
                  paddingLeft: "64px",
                  paddingRight: "64px",
                  borderRadius: "4px",
                  fontSize: "18px",
                }}
                onClick={handleFindTickets}
              >
                Tìm chuyến bay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindTicketBoard;
