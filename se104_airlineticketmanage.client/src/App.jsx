import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Home from "./pages/home";
import Airports from "./pages/airports";
import Schedules from "./pages/schedules";
import Booking from "./pages/booking";
import Tickets from "./pages/tickets";
import Customers from "./pages/customers";
import Report from "./pages/report";
import NotFound from "./components/NotFound";

function App() {
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <BrowserRouter>
      <div className="App">
        <SideBar showSideBar={showSideBar} />
        <div
          className="main_container"
          style={{
            marginLeft: showSideBar ? "260px" : "0",
          }}
        >
          <Header setShowSideBar={setShowSideBar} />
          <div
            style={{
              flex: 1,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/airports" element={<Airports />}></Route>
              <Route path="/schedules" element={<Schedules />}></Route>
              <Route path="/booking" element={<Booking />}></Route>
              <Route path="/tickets" element={<Tickets />}></Route>
              <Route path="/report" element={<Report />}></Route>
              <Route path="/customers" element={<Customers />}></Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
