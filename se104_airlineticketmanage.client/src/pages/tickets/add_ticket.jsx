import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";


const AddTicket = () =>{
  return (
    <form className="ticket" >
      <div className="airport_content mb-4">
        <h5 className="mb-4">Thông tin hạng vé</h5>
        <div className="airport_content_inputs">
          <div className="mb-3">
            <h6>Mã Hạng Vé:</h6>
            <input
              className="form-control"
              type="text"
              // value={}
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
            </span>
          </div>
          <div className="mb-3">
            <h6>Tên Hạng Vé:</h6>
            <input
              className="form-control"
              type="text"
              // value={ticket.name}
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {/* {error.name && error.name} */}
            </span>
          </div>
          <div className="mb-3">
            <h6>Tỉ lệ Vé:</h6>
            <input
              className="form-control"
              type="text"
              // value={ticket.address}
              // onChange={(e) =>
                // setTicket({ ...ticket, address: e.target.value })
              // }
            />
            {/* <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.address && error.address}
            </span> */}
          </div>
        </div>
      </div>
      <button className="btn btn_normal btn_expect">Thêm Hạng Vé</button>

    </form>
  );
};

export default AddTicket;
