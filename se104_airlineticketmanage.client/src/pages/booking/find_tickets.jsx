import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const FindTickets = () => {
  const location = useLocation();

  const [depart, destination, date] = location.search
    .slice(1)
    .split("&")
    .map((item) => item.split("=")[1]);

  console.log(depart, destination, date);

  return <div>
    <p>{depart}</p>
    <p>{destination}</p>
    <p>{date}</p>

    </div>;
};

export default FindTickets;
