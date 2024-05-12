import React, { useMemo } from "react";

function Filter({ filter, setFilter }) {
  const intervalFilterData = useMemo(
    () => [
      {
        title: "Duới 30 phút",
        value: [0, 30],
      },
      {
        title: "Từ 30 - 60 phút",
        value: [30, 60],
      },
      {
        title: "Từ 60 - 90 phút",
        value: [60, 90],
      },
      {
        title: "Trên 90 phút",
        value: [90, 0],
      },
    ],
    []
  );

  return (
    <>
      <div className="d-flex align-items-center gap-4">
        <h6 className="mb-0">Bộ lọc</h6>
        <div className="dropdown">
          <button
            className="form-control dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {filter.transit_time[0] === 0 && filter.transit_time[1] === 0 ? (
              "Thời gian dừng"
            ) : (
              <span>
                {filter.transit_time[0] == 0
                  ? `Dưới ${filter.transit_time[1]} phút`
                  : filter.transit_time[1] == 0
                  ? `Trên ${filter.transit_time[0]} phút`
                  : `Từ ${filter.transit_time[0]} đến ${filter.transit_time[1]} phút`}
              </span>
            )}
          </button>

          <div className="box_shadow dropdown-menu">
            <div
              className="p-3"
              style={{
                width: "530px",
              }}
            >
              <div className="mb-2 d-flex justify-content-between align-items-center">
                {intervalFilterData.map((item, index) => (
                  <button
                    key={index}
                    className="btn btn_primary"
                    onClick={() =>
                      setFilter({
                        ...filter,
                        transit_time: item.value,
                      })
                    }
                    style={{
                      padding: "8px",
                      borderColor:
                        item.value[0] === filter.transit_time[0] &&
                        item.value[1] === filter.transit_time[1]
                          ? "var(--primary-color)"
                          : "",
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <p className="mb-2">Hoặc chọn khoảng thời gian phù hợp</p>
              <div className="filter_range">
                <div>
                  <input
                    type="text"
                    placeholder="VD: 0"
                    className="form-control"
                    value={
                      filter.transit_time[0] == 0 ? "" : filter.transit_time[0]
                    }
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        transit_time: [e.target.value, filter.transit_time[1]],
                      })
                    }
                  />
                  <span>phút</span>
                </div>
                <hr />
                <div>
                  <input
                    type="text"
                    placeholder="VD: 30"
                    className="form-control"
                    value={
                      filter.transit_time[1] == 0 ? "" : filter.transit_time[1]
                    }
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        transit_time: [filter.transit_time[0], e.target.value],
                      })
                    }
                  />
                  <span>phút</span>
                </div>
              </div>
              <div className=" mt-3 text-center">
                <button
                  className="btn btn_normal btn_accept"
                  onClick={() =>
                    setFilter({
                      ...filter,
                      transit_time: [0, 0],
                    })
                  }
                >
                  Bỏ chọn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" d-flex align-items-center gap-4">
        <h6
          className="mb-0"
          style={{
            minWidth: "100px",
          }}
        >
          Sắp xếp theo
        </h6>
        <select
          className="form-select"
          value={filter.sort}
          onChange={(e) =>
            setFilter({
              ...filter,
              sort: e.target.value,
            })
          }
        >
          <option value="default">Mặc định</option> 
          <option value="name_A_to_Z">Tên sân bay từ A đến Z</option>
          <option value="name_Z_to_A">Tên sân bay từ Z đến A</option>
          <option value="transit_min_high_to_low">
            Thời gian dừng tối thiểu từ cao đến thấp
          </option>
          <option value="transit_max_high_to_low">
            Thời gian dừng tối đa từ cao đến thấp
          </option>
        </select>
      </div>
    </>
  );
}

export default Filter;
