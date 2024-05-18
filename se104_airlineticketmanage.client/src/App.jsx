import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { putDataAPI } from "./utils/fetchData";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/SideBar";
import Home from "./pages/home";
import Airports from "./pages/airports";
import AddAirPort from "./pages/airports/add_airport";
import UpdateAirPort from "./pages/airports/update_airport";
import Schedules from "./pages/schedules";
import AddSchedule from "./pages/schedules/add_schedule";
import UpdateSchedule from "./pages/schedules/update_schedule";
import Booking from "./pages/booking";
import FindTickets from "./pages/booking/find_tickets";
import Tickets from "./pages/tickets";
import Customers from "./pages/customers";
import ViewCustomer from "./pages/customers/view_customer";

import Report from "./pages/report";
import NotFound from "./components/NotFound";
import Alert from "./components/Alert";
import DetailAirport from "./pages/schedules/detail_airport";
import TicketDetail from "./pages/booking/ticket_detail";
import FillInformation from "./pages/booking/fill_information";
import Setting from "./pages/setting";

import moment from "moment";
import AddTicket from "./pages/tickets/add_ticket";
import UpdateTicket from "./pages/tickets/update_ticket";

moment.updateLocale("en", {
  weekdays: ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
  months: [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ],
});

export const AppContext = React.createContext(null);

function App() {
  const [showSideBar, setShowSideBar] = useState(true);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const autoCancelTicket = async () => {
      try {
        const res = await putDataAPI("api/VeMayBay/CapNhatVeMayBayMoiNgay");
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    autoCancelTicket();
  }, []);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ alert, setAlert }}>
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
                padding: "16px 24px",
                backgroundColor: "var(--bg-color)",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/airports">
                  <Route index element={<Airports />} />
                  <Route path="add" element={<AddAirPort />} />
                  <Route path="update/:id" element={<UpdateAirPort />} />
                </Route>
                <Route path="/schedules">
                  <Route index element={<Schedules />} />
                  <Route path="add" element={<AddSchedule />} />
                  <Route path="update/:id" element={<UpdateSchedule />} />
                </Route>
                <Route path="/booking">
                  <Route index element={<Booking />} />
                  <Route path="find" element={<FindTickets />} />
                  <Route path="find/fill/:id" element={<FillInformation />} />

                  <Route path="ticket/:id" element={<TicketDetail />} />
                </Route>
                <Route path="/tickets">
                  <Route index element = {<Tickets />} />
                  <Route path="add" element={<AddTicket />} />
                  <Route path="update/:id" element={<UpdateTicket />} />
                </Route>
                <Route path="/report" element={<Report />}></Route>
                <Route path="/customers">
                  <Route index element={<Customers />} />
                  <Route path="view/:id" element={<ViewCustomer />} />
                </Route>

                <Route path="/setting" element={<Setting />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
          <Alert />
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
