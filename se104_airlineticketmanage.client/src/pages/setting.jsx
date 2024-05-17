import { useState, useEffect } from "react";
import { getDataAPI } from "../utils/fetchData";

const Setting = () => {
  const [regulation, setRegulation] = useState({
    min_booking_time: 0,
    cancel_time: 0,
  });

  useEffect(() => {
    const getRegulation = async () => {
      try {
        const res1 = await getDataAPI(
          "api/QuyDinhChung/GetThoiGianChamNhatDatVe"
        );

        const res2 = await getDataAPI("api/QuyDinhChung/GetThoiGianHuyDatVe");

        setRegulation({
          min_booking_time: res1.data,
          cancel_time: res2.data,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getRegulation();
  }, []);

  const handleChangeBookingTime = (value) => {
    if (value < 1) return;
    setRegulation({ ...regulation, min_booking_time: value });
  };

  const handleChangeCancelTime = (value) => {
    if (value < 0) return;
    setRegulation({ ...regulation, cancel_time: value });
  };

  const handleUpdateBookingTime = () => {};

  const handleUpdateCancelTime = () => {};

  return (
    <div>
      <header className="mb-5">
        <h4
          style={{
            color: "var(--text-color-bold)",
          }}
        >
          Cài đặt hệ thống
        </h4>
        <p
          style={{
            color: "var(--text-color-light)",
          }}
        >
          Thay đổi quy định chung của hệ thống quản lý hãng không Dreamer
          Airlines
        </p>
      </header>
      <div
        style={{
          borderBottom: "1px solid var(--border-color)",
        }}
        className="pb-4"
      >
        <h5
          style={{
            color: "var(--text-color-bold)",
          }}
        >
          {" "}
          Thời gian chậm nhất đặt vé
        </h5>
        <p
          style={{
            color: "var(--text-color-light)",
          }}
        >
          Thời gian chậm nhất (ngày) cho phép khách hàng đặt phiếu đặt chỗ trước
          khi thanh toán vé máy bay - tối thiểu là 1 ngày
        </p>
        <div className="d-flex align-items-center">
          <span className="me-3 fw-medium">Giá trị (ngày): </span>
          <input
            className="form-control"
            style={{
              width: "unset",
              padding: "12px",
            }}
            type="number"
            value={regulation.min_booking_time}
            onChange={(e) => handleChangeBookingTime(e.target.value)}
          />
          <button
            className="ms-4 btn btn_normal btn_accept"
            style={{
              maxWidth: "unset",
            }}
            onClick={handleUpdateBookingTime}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
      <div
        style={{
          borderBottom: "1px solid var(--border-color)",
        }}
        className="my-4 pb-4"
      >
        <h5
          style={{
            color: "var(--text-color-bold)",
          }}
        >
          {" "}
          Thời gian hủy đặt vé
        </h5>
        <p
          style={{
            color: "var(--text-color-light)",
          }}
        >
          Thời gian hủy đặt vé (ngày) thiết lập khoảng thời gian tất cả phiếu
          đặt vé sẽ bị hủy trước ngày chuyến bay khởi hành - tối thiểu là 0 ngày
          (tức vào ngày khởi hành).
        </p>
        <div className="d-flex align-items-center">
          <span className="me-3 fw-medium">Giá trị (ngày): </span>
          <input
            className="form-control"
            style={{
              width: "unset",
              padding: "12px",
            }}
            type="number"
            value={regulation.cancel_time}
            onChange={(e) => handleChangeCancelTime(e.target.value)}
          />
          <button
            className="ms-4 btn btn_normal btn_accept"
            style={{
              maxWidth: "unset",
            }}
            onClick={handleUpdateCancelTime}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
