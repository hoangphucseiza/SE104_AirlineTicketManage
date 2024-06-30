import React, { useState, useEffect } from "react";
import Report from "../../components/Customer/Report";
import { getDataAPI } from "../../utils/fetchData";

const listCustomer = [
  {
    id: "KH01",
    name: "Nguyễn Thị Bích Hảo",
    cmnd: "064303000659",
    phone: "0347743943",
  },
];

const Customers = () => {
  const [searchText, setSearchText] = useState("");
  const [searchBy, setSearchBy] = useState("maKH");

  const [customer, setCustomers] = useState(listCustomer);

  const searchBys = ["maKH", "SDT", "CMND"];

  useEffect(() => {
    const getCustomers = async () => {
      let api = "api/KhachHang/GetKhachHangBy";

      switch (searchBy) {
        case "maKH":
          api += "MaKH";
          break;
        case "SDT":
          api += "SDT";
          break;
        default:
          api += "CCCD";
          break;
      }

      api += `/${searchText.toUpperCase()}`;

      if (searchText === "") api = "api/KhachHang/GetDanhSachKhachHang";

      const res = await getDataAPI(api);
      console.log(res);

      const data = res.data["$values"]
        ? res.data["$values"].map((item) => ({
            id: item.maKH,
            name: item.tenKH,
            cmnd: item.cmnd,
            phone: item.sdt,
          }))
        : [
            {
              id: res.data.maKH,
              name: res.data.tenKH,
              cmnd: res.data.cmnd,
              phone: res.data.sdt,
            },
          ];

      setCustomers(data);
    };
    getCustomers();
  }, [searchBy, searchText]);

  useEffect(() => {
    window.location.hash = `searchBy=${searchBy}`;
  }, [searchBy]);

  const formatCMND = (cmnd) => {
    return cmnd.slice(0, 4) + cmnd.slice(4).replace(/./g, "*");
  };

  return (
    <div className="box_cus">
      <div className="home-cards mt-5">
        <div className="mx-4 mb-4">
          <h5 className="mb-3">Tra cứu Vé máy bay</h5>
          <div className="d-flex w-100 gap-3 mb-4">
            <div
              className="home-flights-left-search mb-2"
              style={{
                flex: 1,
              }}
            >
              <i className="fa-solid fa-magnifying-glass me-2" />
              <input
                placeholder="Tìm kiếm..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle filter"
                type="button"
                data-bs-toggle="dropdown"
              >
                {`Tìm kiếm theo:  ${
                  searchBy === "maKH"
                    ? "Mã khách hàng"
                    : searchBy === "SDT"
                    ? "Số điện thoại"
                    : "CMND"
                }`}
              </button>
              <ul
                className="dropdown-menu home-flight-left-filters-airports"
                style={{
                  width: "100%",
                }}
              >
                {searchBys.map((search, index) => (
                  <li key={index} onClick={() => setSearchBy(search)}>
                    {search === "maKH"
                      ? "Mã khách hàng"
                      : search === "SDT"
                      ? "Số điện thoại"
                      : "CMND"}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Mã hành khách</th>
                <th scope="col">Tên hành khách</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Chứng minh nhân dân</th>
              </tr>
            </thead>
            <tbody>
              {customer.map((customer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone}</td>
                  <td>{formatCMND(customer.cmnd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Report cusNumbers={customer.length} />
      </div>
    </div>
  );
};

export default Customers;
