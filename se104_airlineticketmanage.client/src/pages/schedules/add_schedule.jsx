import React from 'react'
import BoxInputAdd from "../../components/Schedules/BoxInputAdd";

const listItemInput = [
  {
    textChild: "Mã CB", 
    attribute: "MaCB",
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Ngày khởi hành", 
    attribute: "ngayDi", 
    iconInput: "faChevronRight",
    typeInput: "select"
  },
  {
    textChild: "Sân bay đi", 
    attribute: "SBDi", 
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Sân bay đến", 
    attribute: "SBDen", 
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Sân bay trung gian", 
    attribute: "SBTG", 
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Thời gian dừng", 
    attribute: "tgDung", 
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Thời gian khởi hành", 
    attribute: "tgKH", 
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Thời gian bay", 
    attribute: "tgBay", 
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Thời gian đến", 
    attribute: "tgDen", 
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Số ghế hạng PT", 
    attribute: "ghePT", 
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Số ghế hạng TG", 
    attribute: "gheTG", 
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Giá vé CB", 
    attribute: "giaCB", 
    iconInput: "",
    typeInput: "select"
  },
  {
    textChild: "Ghi chú", 
    attribute: "ghiChu", 
    iconInput: "",
    typeInput: "select"
  }

];


const AddSchedule = () => {
  const handleTextChange = (value, index) => {
  };
  return (
  <div className="box-add">
      <BoxInputAdd listItem={listItemInput} onTextChange={handleTextChange} />

      <div class="box-add-schedules">
            <div class="d-grid gap-2 col-6 mx-auto">
  <button class="btn btn-primary add-schedule-btn confirm-add" type="button">XÁC NHẬN</button>
            </div>
        </div>
    </div>
  );
}

export default AddSchedule
