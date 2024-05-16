import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  const handleSearch = (event) => {
    event.preventDefault();
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
      slSBTG: 2,
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
      slSBTG: 1,
      hangVe: {
        typePT: "PT",
        slPT: 250,
        typeTG: "TG",
        slTG: 100
      }
    }
  ];

  return (
    <div className="mb-4 table">
      <div className="box_shadow mb-3 table_container">
        <div className="mb-3 ">
          <div className="d-flex justify-content-between align-items-center mb-3 ">
            <h5>Danh sách Lịch chuyến bay</h5>
            <div className="d-flex align-items-center gap-4">
              <form
                className="d-flex justify-content-between align-items-center table_search"
                onSubmit={handleSearch}
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm chuyến bay..."
                  className="form-control me-2"
                  value={searchText}
                  onChange={handleTextSearchChange}
                />
                <i className="fa-solid fa-magnifying-glass" />
              </form>
              <Link
                to={{
                  pathname: "/schedules/add",
                }}
                className="btn btn_table btn_add"
              >
                <i className="fa-solid fa-plus" />
                Thêm mới lịch bay
              </Link>
              
            </div>
          </div>
          <div className="d-flex justify-content-between mb-3 ">
            <FilterBar
               filterOptions={filterOptions}
               onTextSearchChange={handleTextFilterChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <SchedulesTable listSchedule={listScheduleData} />
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
      
    </div>
  );
};

export default Schedules;
