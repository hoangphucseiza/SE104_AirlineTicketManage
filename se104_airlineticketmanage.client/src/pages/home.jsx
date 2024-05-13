import React, { useState } from "react";
import Card from "../components/Home/Card";
import FlightLeft from "../components/Home/FlightLeft";
import FlightRight from "../components/Home/FightRight";
import Members from "../components/Home/Members";
import Weather from "../components/Home/Weather";

import moment from "moment";

const Home_Statistical_Values = [
  {
    title: "Hành khách",
    value: 320,
    increase: 16.9,
    date_time: new Date(),
  },
  {
    title: "Chuyến bay",
    value: 25,
    increase: -16.9,
    date_time: new Date(),
  },
  {
    title: "Phiếu đặt chỗ bị hủy",
    value: 120,
    increase: 8.9,
    date_time: new Date(),
  },
  {
    title: "Doanh thu",
    value: 220000000,
    increase: -16.9,
    date_time: new Date(),
    is_money: true,
  },
];

const filght_Schedules = [
  {
    id: "DA001",
    depart: {
      id: "HAN",
      location: "Hà Nội",
    },
    destination: {
      id: "VDH",
      location: "Quảng Bình",
    },
    depart_date: new Date("12/4/2024 10:00"),
    landing_date: new Date("12/4/2024 12:00"),
    capacity: 150,
    passengers: 80,
  },
  {
    id: "DA001",
    depart: {
      id: "HAN",
      location: "Hà Nội",
    },
    destination: {
      id: "VDH",
      location: "Quảng Bình",
    },
    depart_date: new Date("12/4/2024 10:00"),
    landing_date: new Date("12/4/2024 12:00"),
    capacity: 80,
    passengers: 80,
  },
  {
    id: "DA001",
    depart: {
      id: "HAN",
      location: "Hà Nội",
    },
    destination: {
      id: "VDH",
      location: "Quảng Bình",
    },
    depart_date: new Date("12/4/2024 10:00"),
    landing_date: new Date("12/4/2024 12:00"),
    capacity: 80,
    passengers: 80,
  },
  {
    id: "DA001",
    depart: {
      id: "HAN",
      location: "Hà Nội",
    },
    destination: {
      id: "VDH",
      location: "Quảng Bình",
    },
    depart_date: new Date("12/4/2024 10:00"),
    landing_date: new Date("12/4/2024 12:00"),
    capacity: 80,
    passengers: 80,
  },
];

const Home = () => {
  const [statisticValues, setStatisticValues] = useState(
    Home_Statistical_Values
  );
  const [flightsSchedule, setFlightsSchedule] = useState(filght_Schedules);

  return (
    <div className="home">
      <div className="home-header">
        <h4 className="fw-bold mb-1">DREAMERS AIRLINES</h4>
        <div className="d-flex align-items-center">
          <span>Hệ thống quản lý hãng hàng không</span>
          <i className="fa-solid fa-circle mx-2" />
          <span>{moment().format("dddd, D MMMM, YYYY")}</span>
        </div>
      </div>
      <div className="home-cards mt-5">
        <div className="home-cards-header">
          <h5>HOẠT ĐỘNG</h5>
          <span>Cập nhật thông tin trong ngày</span>
        </div>
        <div className="home-cards-items">
          {statisticValues.map((value, index) => (
            <Card key={index} value={value} />
          ))}
        </div>
      </div>
      <div className="home-flights mt-5">
        <h5 className="mb-3">Lịch Chuyến Bay</h5>
        <div className="home-flights-wrapper">
          <FlightLeft flightsSchedule={flightsSchedule} />
          <FlightRight flight={flightsSchedule[0]} />
        </div>
      </div>
      <div className="mt-5 home_members_weather">
        <div className="home_members">
          <Members />
        </div>
        <div className="home_weather">
          <Weather />
        </div>
      </div>
    </div>
  );
};

export default Home;
