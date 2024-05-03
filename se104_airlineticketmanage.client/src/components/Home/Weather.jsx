import React, { useState, useEffect } from "react";
import moment from "moment";
import weatherType from "../../utils/WeatherType";

const apiKey = "e0eb6344c5185e9dad9808e441c56008";

const Weather = () => {
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("");
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);

  const getWeatherData = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`
    );
    const data = await res.json();
    setCity(data.city?.name?.replace("Thành phố", ""));
    data.list && setWeather(
      data.list
        .filter((forecast) => forecast.dt_txt.includes("12:00:00"))
        .slice(0, 3)
    );
  };

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
            await getWeatherData();
          },
          (error) => console.log(error)
        );
      } else {
        console.log("Geolocation is not support by this browser");
      }
    };

    getLocation();
  }, [lat, lon]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="weather_forecast">
      {weather.length > 0 ? (
        weather.map((forecast, index) => (
          <div key={index} className="mb-4 weather_forecast_item">
            <div className="mb-2 weather_forecast_item-body">
              <div className="weather_forecast_item-date">
                <p>Th {moment(forecast.dt_txt).format("M")}</p>
                <h6>{moment(forecast.dt_txt).format("D")}</h6>
              </div>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{
                  flex: 1,
                }}
              >
                <div className="weather_forecast_item-desc">
                  <span>{city}</span>
                  <p className="mb-0">
                    {capitalizeFirstLetter(forecast.weather[0].description)}
                  </p>
                </div>
                <img
                  src={weatherType[forecast.weather[0].main].icon}
                  alt="Icon"
                />
                <p
                  className="mb-0"
                  style={{
                    fontSize: "32px",
                    color: "var(--text-color-bold)",
                  }}
                >
                  {parseInt(forecast.main.temp)} &#176;C
                </p>
                <div
                  className={`mb-0 weather_forecast_item-state ${
                    weatherType[forecast.weather[0].main].is_risk ? "risk" : ""
                  }`}
                >
                  <i className="fa-solid fa-clock me-1" />
                  <span>
                    {weatherType[forecast.weather[0].main].is_risk
                      ? "Rủi ro cao"
                      : "An toàn"}
                  </span>
                </div>
              </div>
            </div>
            <div className="weather_forecast_item-extra">
              <span>Độ ẩm: {forecast.main.humidity}%</span>
              <span>Hướng gió: {forecast.wind.deg} độ</span>
              <span>Tốc độ gió: {forecast.wind.speed} km/h</span>
            </div>
          </div>
        ))
      ) : (
        <div>Không thể lấy dữ liệu thời tiết</div>
      )}
    </div>
  );
};

export default Weather;
