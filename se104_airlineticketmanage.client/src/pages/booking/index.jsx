import React, { useEffect, useState } from "react";

import { getDataAPI } from "../../utils/fetchData";
import FindTicketBoard from "../../components/Booking/FindTicketBoard";
import TicketList from "../../components/Booking/TicketList";

const Booking = () => {
  return (
    <div className="booking">
      <FindTicketBoard />
      <TicketList />
    </div>
  );
};

export default Booking;
