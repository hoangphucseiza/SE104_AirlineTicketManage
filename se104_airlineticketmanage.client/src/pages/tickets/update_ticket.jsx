import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { getDataAPI, putDataAPI } from "../../utils/fetchData";

const UpdateTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAlert } = useContext(AppContext);

  const [ticket, setTicket] = useState({
    id: "",
    name: "",
    price_rate: "",
  });

  const [error, setError] = useState({});

  useEffect(() => {
    const getTickets = async () => {
      try {
        const res = await getDataAPI("api/HangVe/GetDanhSachHangVe");

        const data = res.data["$values"].map((item) => ({
          id: item.maHV,
          name: item.tenHV,
          price_rate: item.tiLe_Gia,
        }));

        setTicket(data.find((item) => item.id === id));
      } catch (error) {
        console.error(error);
      }
    };

    getTickets();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newError = {};

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
      const res = await putDataAPI(`api/HangVe/${id}`, postData);
      navigate(-1);
      return setAlert({
        title: "Cập nhật hạng vé thành công",
        data: `Cập nhật hạng vé ${ticket.id} - ${ticket.name} thành công!`,
        type: "success",
      });
    } catch (err) {
      return setAlert({
        title: "Cập nhật hạng vé thất bại",
        data: `Cập nhật hạng vé ${ticket.id} - ${ticket.name} không thành công!`,
        type: "error",
      });
    }
  };

  return (
    <form className="airport" onSubmit={handleUpdate}>
      <div className="d-flex  justify-content-between align-items-center mt-1 mb-4 airport_header">
        <div className="d-flex gap-2">
          <h5
            className="mb-0"
            style={{
              color: "var(--text-color-medium)",
            }}
          >
            Chỉnh sửa hạng vé :{" "}
          </h5>
          <h5
            className="mb-0"
            style={{
              color: "var(--text-color-bold)",
            }}
          >
            {`${id} - ${ticket.name}`}
          </h5>
        </div>
        <div>
          <button
            className="btn btn_normal btn_except me-3"
            type="button"
            onClick={() => navigate("/airports")}
          >
            <i className="fa-solid fa-xmark" />
            Hủy bỏ
          </button>
          <button className="btn btn_normal btn_accept" type="submit">
            <i className="fa-solid fa-check" />
            Xác nhận
          </button>
        </div>
      </div>

      <div className="airport_content mb-4">
        <h5 className="mb-4">Thông tin sân bay</h5>
        <div className="airport_content_inputs">
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
    </form>
  );
};

export default UpdateTicket;
