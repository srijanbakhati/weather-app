import React from "react";
import Search from "./search";
import { useState, useEffect } from "react";
const weather = () => {
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [weatherData, setweatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoader(true);
    try {
      const response =
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=a3a9dfc0d46dce123c579d36cf0b6315
            `);
      const data = await response.json();
      if (data) {
        setweatherData(data);
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
  }
  async function handleClick() {
    await fetchWeatherData(search);
  }
  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  useEffect(() => {
    fetchWeatherData("kathmandu");
  }, []);
  console.log(weatherData);
  return (
    <div>
      <Search search={search} setSearch={setSearch} handleClick={handleClick} />
      <div className="weather">
        {loader ? (
          <div className="loading">Loading......</div>
        ) : (
          <div>
            <div className="city-name">
              <h2>
                {weatherData && weatherData.name ? weatherData.name : ""},
                <span>
                  {weatherData && weatherData.sys && weatherData.sys.country
                    ? weatherData.sys.country
                    : ""}
                </span>
                {/* {weatherData?.name}, <span>{weatherData?.sys?.country}</span> */}
              </h2>
            </div>
            <div className="date">
              <span>{getCurrentDate()}</span>
            </div>
            <div className="temp">
              {/* <h2>{weatherData?.main?.temp}</h2> */}
                {weatherData && weatherData.main && weatherData.main.temp
                  ? weatherData.main.temp
                  : ""}
            </div>
            <p className="description">
              {weatherData && weatherData.weather && weatherData.weather[0]
                ? weatherData.weather[0].description
                : ""}
            </p>
            <div className="weather-info">
              <div className="column">
                <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
                </div>
              </div>
              <div className="column">
                <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default weather;
