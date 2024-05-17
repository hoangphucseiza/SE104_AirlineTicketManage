import React, { useState } from 'react';

const StopoverList = ({ flight, setFlight }) => {
    const showStopover = () => {
        setFlight({
            ...flight,
            stopovers: [...flight.stopovers, { id_airport: '', name: '', location: '', time_stop: 0, note: '' }]
        });
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedStopovers = [...flight.stopovers];
        updatedStopovers[index][name] = value;
        setFlight({ ...flight, stopovers: updatedStopovers });
    };

    const handleChangeDestination = (value, id_airport, field) => {
        const updatedStopovers = flight.stopovers.map(stopover =>
            stopover.id_airport === id_airport ? { ...stopover, [field]: value } : stopover
        );
        setFlight({ ...flight, stopovers: updatedStopovers });
    };

    const [clickedStates, setClickedStates] = useState({});

    const onDelete = (id_airport) => {
        setClickedStates(prevState => ({
            ...prevState,
            [id_airport]: !prevState[id_airport]
        }));
    };

    return (
        <div className="stopover-list">
            <h5 className="mb-4">Danh sách sân bay trung gian</h5>
            <div className="airport_content">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Mã sân bay khởi hành</th>
                            <th scope="col">Mã sân bay trung gian</th>
                            <th scope="col">Tên sân bay trung gian</th>
                            <th scope="col">Vị trí sân bay trung gian</th>
                            <th scope="col">Thời gian dừng</th>
                            <th scope="col">Ghi chú</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {flight && flight.stopovers && flight.stopovers.map((stopover, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{flight.maSBDi}</td>
                                <td>{stopover.id_airport}</td>
                                <td>{stopover.name}</td>
                                <td>{stopover.location}</td>
                                <td>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="time_stop"
                                        value={stopover.time_stop}
                                        onChange={(e) => handleChange(index, e)}
                                        style={{
                                            color: (stopover.time_stop < flight.time_stop_min || stopover.time_stop > flight.time_stop_max) ? 'black' : 'initial',
                                            borderColor: (stopover.time_stop < flight.time_stop_min || stopover.time_stop > flight.time_stop_max) ? 'red' : 'initial'
                                        }}
                                        
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control"
                                        placeholder={`Thời gian dừng từ ${flight.time_stop_min} - ${flight.time_stop_max}`}
                                        type="text"
                                        name="note"
                                        value={stopover.note}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button
                                        style={{
                                            backgroundColor: clickedStates[stopover.id_airport] ? 'red' : 'initial',
                                            color: clickedStates[stopover.id_airport] ? 'white' : 'initial'
                                        }}
                                        className="btn btn_table"
                                        onClick={() => onDelete(stopover.id_airport)}
                                    >
                                        {clickedStates[stopover.id_airport] ? 'Không dừng' : <i className="fa-solid fa-delete-left" />}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ padding: "20px" }}>
            <button className="btn btn_normal btn_success" onClick={showStopover}>
            <i className="fa-solid fa-plus" />
            Thêm điểm dừng
          </button>
          </div>
        </div>
    );
};

export default StopoverList;
