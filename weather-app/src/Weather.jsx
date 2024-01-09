import React from "react";
import { useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const searchLocation = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${
          import.meta.env.VITE_APIKEY
        }`
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError("Ga Boleh Kosong")
        alert("Data tidak ditemukan")

      })
    setLocation("");
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  };

  return (
    <div className="max-w-full max-h-screen">
      <div className=" flex justify-center items-center bg-slate-500 w-full h-screen">
        <div className="bg-amber-600 shadow-2xl rounded-2xl flex items-center justify-center flex-col text-center gap-5 p-5">
          <div className="space-x-2">
            <input className="rounded text-sm p-1 "
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="search your city"
              required
            />
            <button className="bg-green-500 rounded p-1 text-sm hover:bg-green-700 duration-300 hover:text-white" onClick={() => searchLocation()}>Submit</button>
          </div>

          {data && data.weather && (
            <div className="flex flex-col items-center gap-2">

              <div>
                <h2 className="text-xl">
                  {data.name}
                </h2>
              </div>

              <p className="text-[10px] gap-2">{renderDate()}</p>

              <div className="flex flex-col">
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt=""
                />
                <h3>{data.weather[0].description}</h3>
              </div>

              <div className="">
                <h1 className="text-2xl">
                  {data.main.temp.toFixed()} <span>&deg;C</span>
                </h1>
                <h3 className="text-sm">
                  Feels Like {data.main.feels_like.toFixed()} <span>&deg;C</span>
                </h3>
              </div>

              <div className="text-md">
                <h3>
                  Wind is {data.wind.speed.toFixed()} Knots in {data.wind.deg}
                  &deg;
                </h3>
              </div>


            </div>
          )}

          {!data.weather && (
            <div className="">
              <h4>No Data found !</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
