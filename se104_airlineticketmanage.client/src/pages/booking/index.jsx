import React, { useEffect, useState } from "react";

import { getDataAPI } from "../../utils/fetchData";
import FindTicketBoard from "../../components/Booking/FindTicketBoard";
import TicketList from "../../components/Booking/TicketList";

const Booking = () => {
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const getAirports = async () => {
      try {
        const res = await getDataAPI("api/SanBay/GetDanhSachSanBay");
        res.data &&
          setAirports(
            res.data["$values"].map((airport) => ({
              id: airport.maSB,
              address: airport.viTri,
            }))
          );
      } catch (err) {
        console.log(err);
      }
    };

    getAirports();
  }, []);

  return (
    <div className="booking">
      <FindTicketBoard airports={airports} />
      <TicketList />
    </div>
  );
};

export default Booking;
