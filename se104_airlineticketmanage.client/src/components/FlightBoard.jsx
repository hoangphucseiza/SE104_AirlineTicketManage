import React from "react";
import moment from "moment";
import Flight_Icon from "../images/flight.svg";

const FlightBoard = ({ flight }) => {
  return (
    <div className="d-flex flight_board">
      <div>
        <h6 className="mb-0">{flight.depart.id}</h6>
        <p className="mb-2">{flight.depart.location}</p>
        <span>{moment(flight.depart_date).format("h:mm")}</span>
      </div>
      <img src={Flight_Icon} alt="Flight icon" />
      <div>
        <h6 className="mb-0">{flight.destination.id}</h6>
        <p className="mb-2">{flight.destination.location}</p>
        <span>{moment(flight.landing_date).format("h:mm")}</span>
      </div>
    </div>
  );
};

export default FlightBoard;
