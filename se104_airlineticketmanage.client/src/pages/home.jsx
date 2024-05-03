import React, { useState, useEffect, useCallback } from "react";
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

const flight_Schedules = [
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
    depart_date: new Date("5/4/2024 10:00"),
    landing_date: new Date("5/4/2024 12:00"),
    capacity: 150,
    passengers: 80,
  },
  {
    id: "DA002",
    depart: {
      id: "HAN",
      location: "Hà Nội",
    },
    destination: {
      id: "DAD",
      location: "Đà Nẵng",
    },
    depart_date: new Date("12/4/2024 10:00"),
    landing_date: new Date("12/4/2024 12:00"),
    capacity: 80,
    passengers: 80,
  },
  {
    id: "DA003",
    depart: {
      id: "SGN",
      location: "TP. Hồ Chí Minh",
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
    id: "DA004",
    depart: {
      id: "HAN",
      location: "Hà Nội",
    },
    destination: {
      id: "PQC",
      location: "Phú Quốc",
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
  const [flightsSchedule, setFlightsSchedule] = useState(flight_Schedules);

  const [showFlights, setShowFlights] = useState([]);
  const [searchFlights, setSearchFlights] = useState("");

  const [filters, setFilters] = useState({
    depart: null,
    destination: null,
    date: null,
  });

  useEffect(() => {
    setShowFlights(flightsSchedule);
  }, [flightsSchedule]);

  useEffect(() => {
    setShowFlights(filterFlights());
  }, [filters]);

  useEffect(() => {
    if (searchFlights) {
      const new_flights = flightsSchedule.filter((flight) => {
        return flight.id.toLowerCase().includes(searchFlights.toLowerCase());
      });
      setShowFlights(new_flights);
    } else {
      setShowFlights(filterFlights());
    }
  }, [flightsSchedule, searchFlights]);

  const filterFlights = useCallback(() => {
    const new_flights = flight_Schedules.filter((flight) => {
      if (filters.depart && filters.depart.id !== flight.depart.id) {
        return false;
      }
      if (
        filters.destination &&
        filters.destination.id !== flight.destination.id
      ) {
        return false;
      }

      if (
        filters.date &&
        !(
          filters.date.getFullYear() === flight.depart_date.getFullYear() &&
          filters.date.getMonth() === flight.depart_date.getMonth() &&
          filters.date.getDate() === flight.depart_date.getDate()
        )
      ) {
        return false;
      }

      return true;
    });
    return new_flights;
  }, [filters]);

  console.log(filters);

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
          <FlightLeft
            flightsSchedule={flightsSchedule}
            showFlights={showFlights}
            filters={filters}
            searchFlights={searchFlights}
            setSearchFlights={setSearchFlights}
            setFilters={setFilters}
          />
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
