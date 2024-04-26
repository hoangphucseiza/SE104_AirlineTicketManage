import React from "react";
import moment from "moment";
import Chart_Up from "../../images/chart-up.svg";
import Chart_Down from "../../images/chart-down.svg";
import FormatMonet from "../../utils/FormatMoney";

const Card = ({ value }) => {
  return (
    
    <div className="home-cards-item">
      <div className="home-cards-item-header">
        <p
          style={{
            maxWidth: "40%",
          }}
        >
          {value.title}
        </p>
        <p>{moment(value.date_time).format("D MMMM, YYYY")}</p>
      </div>
      <div className="home-cards-item-progress">
        <h5
          style={{
            fontSize: value.is_money ? "24px" : "32px",
          }}
        >
          {value.is_money ? FormatMonet(value.value) + " VNĐ" : value.value}
        </h5>
        <div
          className={`home-cards-item-chart ${
            value.increase < 0 ? "decrease " : ""
          }`}
        >
          <img src={value.increase < 0 ? Chart_Down : Chart_Up} alt="chart" />
          <span className="ms-1">
            {" "}
            {`${value.increase > 0 ? "+" : ""}${value.increase}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
