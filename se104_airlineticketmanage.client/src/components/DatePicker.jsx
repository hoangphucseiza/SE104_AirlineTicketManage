import React, { useState, useMemo, useCallback } from "react";

const DatePicker = ({ date, onChangeDate, acceptPastDate = false }) => {
  const [monthYear, setMonthYear] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [pickedDate, setPickedDate] = useState(date ? date : new Date());

  const { month, year } = monthYear;

  const max_days = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [month, year]);

  const day_of_week = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const get_first_day_of_week = useCallback(() => {
    return (new Date(year, month, 1).getDay() + 7) % 8;
  }, [month, year]);

  const get_day_of_week = useCallback(
    (day) => {
      return new Date(year, month, day).getDay();
    },
    [month, year]
  );

  const isDayInPast = useCallback(
    (day) => {
      if (acceptPastDate) return false;
      return (
        month === new Date().getMonth() &&
        year === new Date().getFullYear() &&
        day < new Date().getDate()
      );
    },
    [month, year, acceptPastDate]
  );

  const changeMonth = (newMonth) => {
    if (
      acceptPastDate === false &&
      newMonth + 1 === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      return;
    }
    if (newMonth < 0) {
      return setMonthYear({
        month: 11,
        year: year - 1,
      });
    }
    if (newMonth > 11) {
      return setMonthYear({
        month: 0,
        year: year + 1,
      });
    }
    return setMonthYear({
      ...monthYear,
      month: newMonth,
    });
  };

  const isPickedDate = (day) => {
    return (
      pickedDate.getDate() === day &&
      pickedDate.getMonth() === month &&
      pickedDate.getFullYear() === year
    );
  };

  const handleChangePickedDate = (day) => {
    if (isDayInPast(day)) return;
    setPickedDate(new Date(year, month, day));
    onChangeDate(new Date(year, month, day));
  };

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <i
          className="fa-solid fa-chevron-left"
          onClick={(e) => {
            e.stopPropagation();
            changeMonth(month - 1);
          }}
          style={{
            opacity:
              acceptPastDate === false &&
              month === new Date().getMonth() &&
              year === new Date().getFullYear()
                ? 0.3
                : 1,
          }}
          onChange={() => changeMonth(month + 1)}
        />
        <h5>
          THÁNG {month + 1}, {year}
        </h5>
        <i
          className="fa-solid fa-chevron-right"
          onClick={(e) => {
            e.stopPropagation();
            changeMonth(month + 1);
          }}
        />
      </div>
      <div className="date-picker-body">
        <div className="date-picker-body-header">
          {day_of_week.map((day, index) => (
            <div
              key={index}
              style={{
                color:
                  day === "CN"
                    ? "var(--danger-color)"
                    : day == "T7" && "var(--primary-color)",
              }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="date-picker-body-calender">
          {Array.from({ length: get_first_day_of_week() }).map((_, index) => (
            <div
              key={index}
              style={{
                border: "unset",
              }}
            ></div>
          ))}

          {Array.from({ length: max_days }).map((_, index) => {
            let day = get_day_of_week(index + 1);
            return (
              <div
                key={index}
                className={`${isPickedDate(index + 1) ? "picked" : ""}`}
                style={{
                  color:
                    day === 0
                      ? "var(--danger-color)"
                      : day == 6 && "var(--primary-color)",
                  opacity: isDayInPast(index + 1) ? 0.3 : 1,
                }}
                onClick={() => handleChangePickedDate(index + 1)}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
