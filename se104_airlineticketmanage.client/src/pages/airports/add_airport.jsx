import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";

const AddAirPort = () => {
  const { setAlert } = useContext(AppContext);
  const navigate = useNavigate();

  const [airport, setAirport] = useState({
    id: "",
    name: "",
    transit_min: 0,
    transit_max: 0,
    address: "",
    destination_airports: [],
  });
  const [error, setError] = useState({});
  const [showSearchAirport, setShowSearchAirport] = useState(false);
  const [searchAirport, setSearchAirport] = useState("");
  const [searchAirportList, setSearchAirportList] = useState([]);

  const handleChangeDestination = (newValue, id, keyName) => {
    if (newValue < 1) return;

    const newNumberTransitAirports = airport.destination_airports.map(
      (destination) =>
        destination.destination_id === id
          ? { ...destination, [keyName]: newValue }
          : destination
    );
    setAirport({
      ...airport,
      destination_airports: newNumberTransitAirports,
    });
  };

  const handleDeleteTransit = (id) => {
    const newNumberTransitAirports = airport.destination_airports.filter(
      (destination) => destination.destination_id !== id
    );
    setAirport({
      ...airport,
      destination_airports: newNumberTransitAirports,
    });
  };

  const handleSearchAirport = async (value) => {
    setSearchAirport(value);

    try {
      const res = await getDataAPI(
        `api/SanBay/GetSanBayBySearch/${value.toUpperCase()}`
      );

      const data = res.data["$values"].map((item) => ({
        id: item.maSB,
        name: item.tenSB,
      }));

      setSearchAirportList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAirport = (destination) => {
    setSearchAirport("");
    setSearchAirportList([]);
    setShowSearchAirport(false);

    if (
      airport.destination_airports.find(
        (des) => des.destination_id === destination.id
      )
    ) {
      return setAlert({
        title: "Thêm sân bay dừng thất bại",
        data: `Sân bay đến ${destination.id} - ${destination.name} đã tồn tại!`,
        type: "error",
      });
    }

    const newItem = {
      destination_id: destination.id,
      destination_name: destination.name,
      max_transit_airports: 1,
      min_flight_time: 30,
    };
    setAirport({
      ...airport,
      destination_airports: [...airport.destination_airports, newItem],
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newError = {};

    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const vietnameseCharacterRegex = /[^\x00-\x7F]/;

    if (airport.id.length < 3)
      newError.id = "*Mã sân bay phải có ít nhất 3 ký tự";
    else if (specialCharacterRegex.test(airport.id)) {
      newError.id = "*Mã sân bay không được chứa ký tự đặc biệt";
    } else if (vietnameseCharacterRegex.test(airport.id)) {
      newError.id = "*Mã sân bay không được chứa ký tự tiếng Việt";
    }

    if (airport.name.length === 0)
      newError.name = "*Tên sân bay không được để trống";

    if (airport.address.length === 0)
      newError.address = "*Vị trí sân bay không được để trống";

    if (airport.transit_min < 0)
      newError.transit_min =
        "*Thời gian dừng tối thiểu phải lớn hơn hoặc bằng 0";

    if (airport.transit_max < 1)
      newError.transit_max = "*Thời gian dừng tối thiểu phải lớn hơn 0";
    else if (parseInt(airport.transit_max) < parseInt(airport.transit_min))
      newError.transit_max =
        "*Thời gian dừng tối đa phải lớn hơn thời gian dừng tối thiểu";

    setError(newError);
    if (Object.keys(newError).length > 0) {
      return;
    }

    const postData = {
      maSanBay: airport.id,
      tenSanBay: airport.name,
      thoiGianDungMin: airport.transit_min,
      thoiGianDungMax: airport.transit_max,
      viTri: airport.address,
      sanBayDens: airport.destination_airports.map((destination) => ({
        maSanBay: destination.destination_id,
        tenSanBay: destination.destination_name,
        soSanBayDungToiDa: destination.max_transit_airports,
        thoiGianBayToiThieu: destination.min_flight_time,
      })),
    };

    try {
      const res = await postDataAPI("api/SanBay/CreateSanBay", postData);
      navigate("/airports");
      return setAlert({
        title: "Thêm sân bay thành công",
        data: `Sân bay ${airport.id} - ${airport.name} đã được thêm vào hệ thống!`,
        type: "success",
      });
    } catch (err) {
      return setAlert({
        title: "Thêm sân bay thất bại",
        data: err.response.data[""].errors["$values"]
          ? err.response.data[""].errors["$values"][0].errorMessage
          : `Mã sân bay ${airport.id} đã tồn tại!`,
        type: "error",
      });
    }
  };

  return (
    <form className="airport" onSubmit={handleAdd}>
      <h5
        className="mb-4 mt-1 ms-3"
        style={{
          color: "var(--text-color-bold)",
        }}
      >
        Thêm sân bay mới
      </h5>

      <div className="airport_content mb-4">
        <h5 className="mb-4">Thông tin sân bay</h5>
        <div className="airport_content_inputs">
          <div className="mb-3">
            <h6>Mã sân bay:</h6>
            <input
              className="form-control"
              type="text"
              value={airport.id}
              onChange={(e) => setAirport({ ...airport, id: e.target.value })}
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
            <h6>Tên sân bay sân bay:</h6>
            <input
              className="form-control"
              type="text"
              value={airport.name}
              onChange={(e) => setAirport({ ...airport, name: e.target.value })}
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
            <h6>Vị trí sân bay:</h6>
            <input
              className="form-control"
              type="text"
              value={airport.address}
              onChange={(e) =>
                setAirport({ ...airport, address: e.target.value })
              }
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.address && error.address}
            </span>
          </div>
          <div className="mb-3">
            <h6>Thời gian dừng tối thiểu</h6>
            <input
              className="form-control"
              type="number"
              value={airport.transit_min}
              onChange={(e) =>
                setAirport({
                  ...airport,
                  transit_min: e.target.value,
                })
              }
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.transit_min && error.transit_min}
            </span>
          </div>
          <div className="mb-3">
            <h6>Thời gian dừng tối đa</h6>
            <input
              className="form-control"
              type="number"
              value={airport.transit_max}
              onChange={(e) =>
                setAirport({
                  ...airport,
                  transit_max: e.target.value,
                })
              }
            />
            <span
              style={{
                color: "var(--danger-color)",
              }}
            >
              {error.transit_max && error.transit_max}
            </span>
          </div>
        </div>
      </div>
      <div className="airport_content">
        <h5 className="mb-4">Danh sách sân bay dừng</h5>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Mã sân bay đi</th>
              <th scope="col">Mã sân bay đến</th>
              <th scope="col">Tên sân bay đến</th>
              <th scope="col">Số sân bay dừng tối đa</th>
              <th scope="col">Thời gian bay tối thiểu</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {airport.destination_airports.map((destination, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{airport.id}</td>
                <td>{destination.destination_id}</td>
                <td>{destination.destination_name}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={destination.max_transit_airports}
                    onChange={(e) =>
                      handleChangeDestination(
                        e.target.value,
                        destination.destination_id,
                        "max_transit_airports"
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={destination.min_flight_time}
                    onChange={(e) =>
                      handleChangeDestination(
                        e.target.value,
                        destination.destination_id,
                        "min_flight_time"
                      )
                    }
                  />
                </td>
                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                  <button
                    className="btn btn_table btn_delete"
                    onClick={(e) =>
                      handleDeleteTransit(destination.destination_id)
                    }
                  >
                    <i className="fa-solid fa-delete-left" />
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            <tr
              style={{
                height: "50px",
              }}
            >
              {!showSearchAirport ? (
                <td
                  className="fw-medium"
                  colSpan={6}
                  style={{
                    color: "var(--primary-color)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowSearchAirport(true)}
                >
                  Thêm sân bay đến
                </td>
              ) : (
                <td className="position-relative" colSpan={6}>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      borderRadius: "4px",
                      width: "200px",
                      border: "none",
                    }}
                    placeholder="Nhập mã sân bay..."
                    autoFocus={showSearchAirport && true}
                    value={searchAirport}
                    onChange={(e) => handleSearchAirport(e.target.value)}
                  />
                  <div className="airport_search_airport">
                    {searchAirportList.map((destination, index) => (
                      <div
                        className="d-flex align-items-center"
                        key={index}
                        onClick={() => handleClickAirport(destination)}
                      >
                        <span>{`${destination.id} - ${destination.name}`}</span>
                      </div>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          </tbody>
        </table>

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
      </div>
    </form>
  );
};

export default AddAirPort;
