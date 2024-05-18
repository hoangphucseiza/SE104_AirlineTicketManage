import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { postDataAPI } from "../../utils/fetchData";

const AddTicket = () => {
  const navigate = useNavigate();
  const { setAlert } = useContext(AppContext);

  const [ticket, setTicket] = useState({
    id: "",
    name: "",
    price_rate: "",
  });

  const [error, setError] = useState({});

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newError = {};

    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const vietnameseCharacterRegex = /[^\x00-\x7F]/;

    if (ticket.id.length === 0) newError.id = "*Mã vé không được để trống";
    else if (specialCharacterRegex.test(ticket.id)) {
      newError.id = "*Mã vé không được chứa ký tự đặc biệt";
    } else if (vietnameseCharacterRegex.test(ticket.id)) {
      newError.id = "*Mã vé không được chứa ký tự tiếng Việt";
    }

    if (!ticket.name) {
      newError.name = "*Tên hạng vé không được để trống";
    }

    if (ticket.price_rate <= 0) {
      newError.price_rate = "*Tỉ lệ giá phải lớn hơn 0";
    }

    if (Object.keys(newError).length > 0) {
      return setError(newError);
    } else {
      setError({});
    }

    const postData = {
      maHV: ticket.id,
      tenHV: ticket.name,
      tiLe_Gia: ticket.price_rate,
    };

    try {
      const res = await postDataAPI("api/HangVe/AddHangVe", postData);
      navigate(-1);
      return setAlert({
        title: "Thêm hạng vé thành công",
        data: `Thêm hạng vé ${ticket.id} - ${ticket.name} thành công!`,
        type: "success",
      });
    } catch (err) {
      return setAlert({
        title: "Thêm hạng vé thất bại",
        data: `Hạng vé ${ticket.id} - ${ticket.name} đã tồn tại!`,
        type: "error",
      });
    }
  };

  return (
    <form className="airport" onSubmit={handleUpdate}>
      <h5
        className="mb-4 mt-1 ms-3"
        style={{
          color: "var(--text-color-bold)",
        }}
      >
        Thêm hạng vé mới
      </h5>

      <div className="airport_content mb-4">
        <h5 className="mb-4">Thông tin sân bay</h5>
        <div className="airport_content_inputs">
          <div className="mb-3">
            <h6>Mã hạng vé:</h6>
            <input
              className="form-control"
              type="text"
              value={ticket.id}
              onChange={(e) => setTicket({ ...ticket, id: e.target.value })}
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.id && error.id}
            </span>
          </div>
          <div className="mb-3">
            <h6>Tên hạng vé:</h6>
            <input
              className="form-control"
              type="text"
              value={ticket.name}
              onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.name && error.name}
            </span>
          </div>
          <div className="mb-3">
            <h6>Tỉ lệ giá:</h6>
            <input
              className="form-control"
              type="number"
              value={ticket.price_rate}
              onChange={(e) =>
                setTicket({ ...ticket, price_rate: e.target.value })
              }
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.price_rate && error.price_rate}
            </span>
          </div>
        </div>
      </div>
      <div className="py-3 text-center">
          <button
            className="btn btn_normal btn_except me-3"
            type="button"
            onClick={() => navigate("/airports")}
          >
            <i className="fa-solid fa-xmark" />
            Hủy bỏ
          </button>
          <button className="btn btn_normal btn_success" type="submit">
            <i className="fa-solid fa-plus" />
            Thêm
          </button>
        </div>
    </form>
  );
};

export default AddTicket;
