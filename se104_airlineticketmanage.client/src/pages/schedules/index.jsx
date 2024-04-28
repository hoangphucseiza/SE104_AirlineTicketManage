import React, { useState } from "react";
import SearchBar from "../../components/Customer/SearchBar";
import FilterBar from "../../components/Customer/FilterBar";
import Members from "../../components/Home/Members";
import Weather from "../../components/Home/Weather";
import SchedulesTable from "../../components/Schedules/SchedulesTable";

const Schedules = () => {
  const [searchText, setSearchText] = useState("");
  const handleTextSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const [textFilter, setTextFilter] = useState("");
  const handleTextFilterChange = (newValue) => {
    setTextFilter(newValue);
  };

  const filterOptions = [
    {
      label: "Mã CB",
      values: ["1", "2", "3"]
    },
    {
      label: "Ngày bay",
      values: ["1", "2", "3"]
    },
    {
      label: "Sân bay đi",
      values: ["1", "2", "3"]
    },
    {
      label: "Sân bay đến",
      values: ["1", "2", "3"]
    }
  ];

  const listScheduleData = [
    {
      maCB: "CB001",
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
      tgBay: "20 phut",
      giaVeCB: "700 000 VND",
      hangVe: {
        typePT: "PT",
        slPT: 250,
        typeTG: "TG",
        slTG: 100
      }
    },
    {
      maCB: "CB002",
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
      tgBay: "20 phut",
      giaVeCB: "700 000 VND",
      hangVe: {
        typePT: "PT",
        slPT: 250,
        typeTG: "TG",
        slTG: 100
      }
    }
  ];

  return (
    <div className="box_cus">
      <div className="home-cards mt-5">
        <div className="home-cards-header">
          <h5>TRA CỨU LỊCH CHUYẾN BAY</h5>
        </div>
        <div className="container-bar">
          <SearchBar
            text_search={"Thông tin chuyến bay..."}
            onTextSearchChange={handleTextSearchChange}
          />
          <FilterBar
            filterOptions={filterOptions}
            onTextSearchChange={handleTextFilterChange}
          />
        </div>

        <div className="line"></div>

        <div className="home-flights mt-5">
          <div className="home-flights-wrapper">
            <SchedulesTable listSchedule={listScheduleData} />
          </div>
        </div>

        <div class="box-add-schedules">
          <div class="d-grid gap-2 col-6 mx-auto">
            <button class="btn btn-primary add-schedule-btn" type="button">Thêm mới lịch bay</button>
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

      <div className="home-flights mt-5"></div>
    </div>
  );
};

export default Schedules;
