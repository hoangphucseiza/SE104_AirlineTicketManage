import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import "../styles/header.css";
import Logo from "../images/logo_ver.png";
import RoutesName from "../utils/Route_Name";

function Header({ setShowSideBar }) {
  const { pathname } = useLocation();

  const setNagivatorContent = useCallback(() => {
    var pathname_array = pathname.split("/").slice(1);
    var main_path = RoutesName[pathname_array[0]];
    var sub_paths = main_path
      ? pathname_array
          .slice(1)
          .map((path) =>
            main_path.sub_paths[path] ? main_path.sub_paths[path] : path
          )
      : [];

    return [main_path ? main_path.name : pathname_array[0], ...sub_paths];
  }, [pathname]);

  return (
    <header className="d-flex header">
      <div className="header-action">
        <i
          className="fa-solid fa-bars me-4"
          onClick={() => setShowSideBar((pre) => !pre)}
        />
        {setNagivatorContent().map((content, index, array) => (
          <>
            <span className={`${index == array.length - 1 ? "active" : ""}`}>
              {content}
            </span>
            {index < array.length - 1 && <span className="mx-2">/</span>}
          </>
        ))}
      </div>
      <div className="header-logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="d-flex align-items-center header-info">
        <div className="me-4 header-info-notify">
          <i className="fa-solid fa-bell " />
        </div>
        <div className="header-info-user">
          <img
            src="https://i.pinimg.com/736x/83/1e/8d/831e8d93300da1fe5ff6295ca53ee97d.jpg"
            alt="user-avt"
          />
          <div>
            <h5>Nguyễn Hoàng Việt</h5>
            <span>Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
