import React, { useState, useEffect } from 'react';

const AirportSelect = ({ name, value, onChange, onAirportIdsChange }) => {
    const [airports, setAirports] = useState([]);
    const mockAirports = [
        {
            id: "VDH",
            name: "Sân bay Đồng Hới",
            location: "Quảng Bình"
        },
        {
            id: "DAD",
            name: "Cảng hàng không quốc tế Đà Nẵng",
            location: "Đà Nẵng"
        },
    ];

    useEffect(() => {
        setAirports(mockAirports);
        if (onAirportIdsChange) {
            const airportIds = mockAirports.map(airport => airport.id);
            onAirportIdsChange(airportIds); // Call the callback with the IDs
        }
    }, [onAirportIdsChange]);

    return (
        <div>
            <select className="form-control" name={name} value={value} onChange={onChange}>
                <option value="" disabled hidden>Chọn sân bay</option>
                {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                        {airport.name} - {airport.location}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AirportSelect;
