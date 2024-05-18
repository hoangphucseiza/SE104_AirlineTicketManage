import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const testData = { MaHV: 1, HangVe: 'Binh Thuong', TiLe: 1.0 };
const UpdateTicket = () =>{
    const [ticket,setTicket] = useState(testData);
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
            value={testData.MaHV}
            onChange= { (e) => 
                setTicket({...ticket, MaHV:e.target.value})
            }
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
              value={ticket.HangVe}
              onChange= { (e) => 
                setTicket({...ticket, HangVe:e.target.value})
            }
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
              value={ticket.TiLe}
              onChange={(e) =>
                setTicket({ ...ticket, TiLe: e.target.value })
              }
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
      <button className="btn btn_normal btn_expect">Sửa</button>
    </form>
  );
};

export default UpdateTicket;
