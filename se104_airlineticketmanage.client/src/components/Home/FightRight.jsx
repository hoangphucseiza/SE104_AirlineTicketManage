import React from "react";
import FlightBoard from "../FlightBoard";

const FlightRight = ({ flight }) => {
  return (
    <div className="home-flights-right">
      <div className="d-flex align-items-center flex-column home-flights-right-above">
        <div className="mb-3 home-flights-rights-header">
          <span>Đang bay</span>
        </div>
        <h5 className="mb-3">{flight.id}</h5>
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
          <span>Phiếu đặt vé đã hủy</span>
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
