import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo_hoz.png";

function SideBar({ showSideBar }) {
  const [active, setActive] = useState(0);

  const MenuItems = useMemo(
    () => [
      {
        id: 0,
        title: "Trang chủ",
        icon: "fa-brands fa-windows",
        link: "/",
      },
      {
        id: 1,
        title: "Sân bay",
        icon: "fa-solid fa-plane-departure",
        link: "/airports",
      },
      {
        id: 2,
        title: "Lịch chuyến bay",
        icon: "fa-solid fa-calendar-days",
        link: "/schedules",
      },
      {
        id: 3,
        title: "Đặt vé",
        icon: "fa-solid fa-ticket",
        link: "/booking",
      },
      {
        id: 4,
        title: "Doanh mục hạng vé",
        icon: "fa-solid fa-layer-group",
        link: "/tickets",
      },
      {
        id: 5,
        title: "Báo cáo thống kê",
        icon: "fa-solid fa-chart-line",
        link: "/report",
      },
      {
        id: 6,
        title: "Chăm sóc khách hàng",
        icon: "fa-solid fa-users",
        link: "/customers",
      },
      {
        id: 7,
        title: "Hỗ trợ",
        icon: "fa-solid fa-headphones",
        link: "/supports",
      },
      {
        id: 8,
        title: "Cài đặt",
        icon: "fa-solid fa-gear",
        link: "/setting",
      },
      {
        id: 9,
        title: "Đăng xuất",
        icon: "fa-solid fa-arrow-right-from-bracket",
        link: "/logout",
      },
    ],
    []
  );

  return (
    <div className={`side_bar ${showSideBar ? "active" : ""}`}>
      <div className="side_bar-logo">
        <img src={Logo} alt="logo" />
      </div>
      <hr className="divider" />
      <nav className="navbar">
        <ul
          className="navbar-nav"
          style={{
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          <div>
            {MenuItems.slice(0, 7).map((item, index) => (
              <li key={index} className="nav-item mb-1">
                <Link
                  to={item.link}
                  className={`nav-link ${active === item.id ? "active" : ""}`}
                  onClick={() => setActive(item.id)}
                >
                  <span className="icon-wrapper">
                    <i className={item.icon} />
                  </span>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </div>

          <div>
            {MenuItems.slice(7).map((item, index) => (
              <li key={index} className="nav-item mb-1">
                <Link
                  to={item.link}
                  className={`nav-link ${active === item.id ? "active" : ""}`}
                  onClick={() => setActive(item.id)}
                >
                  <span className="icon-wrapper">
                    <i className={item.icon} />
                  </span>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
