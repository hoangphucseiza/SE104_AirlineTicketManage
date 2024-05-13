// chưa có Router
import React from "react";
import DetailMiddleAirport from "../../components/Schedules/DetailMiddleAirport";

const list_Airports = [
  {
    maSB_Di: "SGN",
    maSBTG: "PXU",
    tenSBTG:"Pleiku",
    vtriSBTG: "Gia Lai",
    maSB_Den:"HAN",
    tgDung: "20p",
    ghiChu: "Delay 30p",
    trangThai: "KHÔNG DỪNG"
},
{
  maSB_Di: "SGN",
  maSBTG: "PXU",
  tenSBTG:"Pleiku",
  vtriSBTG: "Gia Lai",
  maSB_Den:"HAN",
  tgDung: "20p",
  ghiChu: "Delay 30p",
  trangThai: "DỪNG"
},
{
  maSB_Di: "SGN",
  maSBTG: "PXU",
  tenSBTG:"Pleiku",
  vtriSBTG: "Gia Lai",
  maSB_Den:"HAN",
  tgDung: "20p",
  ghiChu: "Delay 30p",
  trangThai: "DỪNG"
}

]

const DetailAirport = ({ listMiddleAirports }) => {
    return (
        <div>
        <h2>Chi tiết chuyến bay mã ...</h2>

        <div className="home-flights mt-5">
          <div className="home-flights-wrapper">
            <DetailMiddleAirport listMiddleAirports = {list_Airports} />
          </div>
        </div>
        </div>
    )
  };
  

export default DetailAirport;