import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BoxInputAdd = ({ listItem, onTextChange }) => {
  const handleChange = (event, index) => {
    onTextChange(event.target.value, index);
  };

  return (
<div>
      {listItem.map((item, index) => (
        <div className="input-group mb-3" key={index}>
          <div className="box-text" style={{ width: '20%'}}>
            <button className="btn btn-outline-secondary" style={{ background: "var(--primary-color-15)", border: "none" }} type="button">{item.textChild}</button>
          </div>
          <div className="box-input" style={{ width: '80%' }}>
            {item.textChild === "Ngày khởi hành" ? (
              <input 
                type="date" 
                className="form-control" 
                id={`inputGroupSelect03-${index}`} 
                onChange={(e) => handleChange(e, index)}
  required 
  onInvalid={(e) => {
    e.target.setCustomValidity('Vui lòng nhập thông tin.');
  }}
              />
            ) : item.textChild === "Thời gian khởi hành" || item.textChild === "Thời gian đến" ? (
              <input
                type="time"
                className="form-control"
                id={`inputGroupSelect03-${index}`}
                onChange={(e) => handleChange(e, index)}
  required 
  onInvalid={(e) => {
    e.target.setCustomValidity('Vui lòng nhập thông tin.');
  }}
              />
            ) : item.textChild === "Ghi chú" || item.textChild === "Mã CB" ? (
                <input 
                  type="text" 
                  className="form-control" 
                  id={`inputGroupSelect03-${index}`} 
                  onChange={(e) => handleChange(e, index)}
                />
              )
             : (
              <select
                className="form-select"
                id={`inputGroupSelect03-${index}`}
                onChange={(e) => handleChange(e, index)}
  required 
  onInvalid={(e) => {
    e.target.setCustomValidity('Vui lòng nhập thông tin.');
  }}
              >
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoxInputAdd;