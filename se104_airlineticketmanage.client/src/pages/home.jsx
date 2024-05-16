import React, { useState, useEffect, useCallback } from "react";
import Card from "../components/Home/Card";
import FlightLeft from "../components/Home/FlightLeft";
import FlightRight from "../components/Home/FightRight";
import Members from "../components/Home/Members";
import Weather from "../components/Home/Weather";
import { getDataAPI } from "../utils/fetchData";

import moment from "moment";

const Home = () => {
  const [statisticValues, setStatisticValues] = useState([]);
  const [flightsSchedule, setFlightsSchedule] = useState([]);

  const [showFlights, setShowFlights] = useState([]);
  const [searchFlights, setSearchFlights] = useState("");
  const [showFlightRight, setShowFlightRight] = useState(false);

  const [filters, setFilters] = useState({
    depart: null,
    destination: null,
    date: null,
  });

  useEffect(() => {
    const getStatisticValues = async () => {
      try {
        const res = await getDataAPI(`api/ChuyenBay/ThongKeTrangChu`);
        const data = res.data["$values"].map((item) => ({
          title: item.title,
          value: item.value,
          increase: item.increase,
          date_time: new Date(),
          is_money: item.title === "Doanh thu" ? true : false,
        }));
        setStatisticValues(data);
      } catch (err) {
        console.log(err);
      }
    };

    getStatisticValues();
  }, []);

  useEffect(() => {
    const getFlightSchedules = async () => {
      try {
        const res = await getDataAPI(`api/ChuyenBay/Get4ChuyenBay`);

        const data = res.data["$values"].map((item) => ({
          id: item.maCB,
          depart: {
            id: item.sanBayDen.maSB,
            address: item.sanBayDen.viTri,
          },
          destination: {
            id: item.sanBayDi.maSB,
            address: item.sanBayDi.viTri,
          },
          depart_date: new Date(item.ngayGioBay),
          landing_date: new Date(item.ngayGioDen),
          capacity: item.tongSoVe,
          passengers: item.soVeMua,
        }));

        setFlightsSchedule(data);
        setShowFlightRight(data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getFlightSchedules();
  }, []);

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
    const new_flights = flightsSchedule.filter((flight) => {
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
  }, [filters, flightsSchedule]);

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
            setShowFlightRight={setShowFlightRight}
          />
          <FlightRight flight={showFlightRight} />
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
