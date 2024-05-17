import React, { useCallback } from "react";
import FlightBoard from "../FlightBoard";
import moment from "moment";

const FlightRight = ({ flight }) => {
  if (!flight) return <div className="home-flights-right"></div>;

  const renderHeader = useCallback(() => {
    const nowDate = new Date();

    if (flight.landing_date.getTime() <= nowDate.getTime()) {
      return "Đã hạ cánh";
    }
    if (
      flight.depart_date.getTime() <= nowDate.getTime() &&
      flight.landing_date.getTime() >= nowDate.getTime()
    ) {
      return "Đang bay";
    }

    if (flight.depart_date.getTime() >= nowDate.getTime()) {
      return "Sắp cất cánh";
    }
    return "";
  }, [flight]);

  return (
    <div className="home-flights-right">
      <div className="d-flex align-items-center flex-column home-flights-right-above">
        <div className="mb-3 home-flights-rights-header">
          <span>{renderHeader()}</span>
        </div>
        <h5 className="mb-3">{`${flight.id} - ${moment(
          flight.depart_date
        ).format("D MMMM")}`}</h5>
        <FlightBoard flight={flight} />
        <div className="my-3 w-100">
          <div className="home-flight-rights-process mb-1">
            <div
              style={{
                backgroundColor: "var(--primary-color)",
                width: (flight.passengers / flight.capacity) * 100 + "%",
              }}
            />
          </div>
          <div className="d-flex justify-content-between">
            <span
              style={{
                color: "var(--text-color-light)",
              }}
            >
              Sức chứa
            </span>
            <span className="fw-medium">
              {parseInt((flight.passengers / flight.capacity) * 100)}%
            </span>
          </div>
        </div>
        <h6
          style={{
            fontSize: "18px",
            color: "var(--text-color-bold)",
          }}
        >
          Tổng số ghế: {flight.capacity}
        </h6>
      </div>
      <div className="d-flex align-items-center flex-column mt-3 home-flights-right-below">
        <div className="mb-3 home-flights-rights-header">
          <span>Số lượng ghế trống</span>
        </div>
        <h5 className="mb-3">{flight.id}</h5>

        <div className="my-3 w-100">
          <div className="home-flight-rights-process mb-1">
            <div
              style={{
                backgroundColor: "var(--danger-color)",
                width:
                  ((flight.capacity - flight.passengers) / flight.capacity) *
                    100 +
                  "%",
              }}
            />
          </div>
          <div className="d-flex justify-content-between">
            <span
              style={{
                color: "var(--text-color-light)",
              }}
            >
              Tỉ lệ
            </span>
            <span className="fw-medium">
              {parseInt(
                ((flight.capacity - flight.passengers) / flight.capacity) * 100
              )}
              %
            </span>
          </div>
        </div>
        <h6
          style={{
            fontSize: "18px",
            color: "var(--text-color-bold)",
          }}
        >
          Số lượng: {flight.capacity - flight.passengers}
        </h6>
      </div>
    </div>
  );
};

export default FlightRight;
