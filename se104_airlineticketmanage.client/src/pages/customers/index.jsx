import React, { useState } from "react";
import SearchBar from "../../components/Customer/SearchBar";
import FilterBar from "../../components/Customer/FilterBar";
import Report from "../../components/Customer/Report";
import CusTable from "../../components/Customer/CusTable";
import Members from "../../components/Home/Members";
import Weather from "../../components/Home/Weather";

const Customers = () => {
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
      label: "Mã KH",
      values: ["1", "2", "3"]
    },
    {
      label: "Tên KH",
      values: ["1", "2", "3"]
    },
    {
      label: "Số CCCD",
      values: ["1", "2", "3"]
    },
    {
      label: "SĐT",
      values: ["1", "2", "3"]
    }, 
    {
      label: "Vị trí SB",
      values: ["1", "2", "3"]
    }

  ];

  const result = {
    totalCus: 100,
    totalRevenue: "150 000 000",
  };

  const listCustomer = [
    {
      maKH: "KH01",
      tenKH: "Nguyễn Thị Bích Hảo",
      cccd: "064303000659",
      sdt: "0347743943", 
      maCB: "CB001", 
      ngayBay: new Date("12/4/2024 10:00"),
      vitri: "Gia Lai"
    },
    {
      maKH: "KH01",
      tenKH: "Nguyễn Thị Bích Hảo",
      cccd: "064303000659",
      sdt: "0347743943", 
      maCB: "CB001", 
      ngayBay: new Date("12/4/2024 10:00"),
      vitri: "Gia Lai"
    },
    {
      maKH: "KH01",
      tenKH: "Nguyễn Thị Bích Hảo",
      cccd: "064303000659",
      sdt: "0347743943", 
      maCB: "CB001", 
      ngayBay: new Date("12/4/2024 10:00"),
      vitri: "Gia Lai"
    } 
  ]

  return (
    <div class="box_cus">
      <div className="home-cards mt-5">
        <div className="home-cards-header">
          <h5>DANH SÁCH KHÁCH HÀNG</h5>
          <span>Lịch sử khách hàng</span>
        </div>
        <div class= "container-bar">
             <SearchBar 
        text_search={"Thông tin khách hàng..."} 
        onTextSearchChange={handleTextSearchChange} 
        />

             <FilterBar  
        filterOptions={filterOptions} 
        onTextSearchChange={handleTextFilterChange}/>
        </div>

        <div className="line"></div>
          
        <div className="home-flights mt-5">
        <div className="home-flights-wrapper">
          <CusTable listCus={listCustomer} />
          <Report result={result} />
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

      <div className="home-flights mt-5">
       
        
      </div>
    </div>
  )
}

export default Customers
