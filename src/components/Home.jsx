import React, { useState } from 'react';
import { WiHumidity } from "react-icons/wi";
import { IoSearchOutline } from 'react-icons/io5';
import { LuWind } from "react-icons/lu";
import { TiWeatherShower, TiWeatherCloudy, TiWeatherNight, TiWeatherPartlySunny, TiWeatherSnow, TiWeatherStormy, TiWeatherSunny, TiWeatherWindy, TiWeatherWindyCloudy } from 'react-icons/ti';
import { WiSunrise } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { FaCloud } from "react-icons/fa";

function convertUnixTimestampToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export default function Home() {
  const [city, setCity] = useState('Colombo');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = "b6e79a15dc76a234e82ca995672292c5";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  const weatherIconMappings = {
    Thunderstorm: <TiWeatherStormy className="text-9xl text-white mb-5" />,
    Drizzle: <TiWeatherShower className="text-9xl text-white mb-5" />,
    Rain: <TiWeatherShower className="text-9xl text-white mb-5" />,
    Snow: <TiWeatherSnow className="text-9xl text-white mb-5" />,
    Clear: <TiWeatherSunny className="text-9xl text-white mb-5" />,
    Clouds: <FaCloud className="text-9xl text-white mb-5" />,
    Mist: <TiWeatherPartlySunny className="text-9xl text-white mb-5" />,
    Smoke: <TiWeatherPartlySunny className="text-9xl text-white mb-5" />,
    Haze: <TiWeatherPartlySunny className="text-9xl text-white mb-5" />,
    Dust: <TiWeatherPartlySunny className="text-9xl text-white mb-5" />,
    Fog: <TiWeatherPartlySunny className="text-9xl text-white mb-5" />,
    Sand: <TiWeatherPartlySunny className="text-9xl text-white mb-5" />,
    Ash: <TiWeatherPartlySunny className="text-9xl text-white mb-5" />,
    Squall: <TiWeatherWindy className="text-9xl text-white mb-5" />,
    Tornado: <TiWeatherStormy className="text-9xl text-white mb-5" />,
  };

  const checkWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
      const data = await response.json();
      setWeatherData(data);
      const weatherIcon = weatherData.weather[0].main;
      console.log(weatherIcon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearchClick = () => {
    checkWeather();
  };

  return (
    <div className="m-3 rounded-md max-h-full bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="mx-10 p-10 search flex flex-col items-center sm:flex-row sm:items-start">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={handleInputChange}
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-teal-500 focus:ring-orange-600 sm:text-sm mb-2 sm:mb-0 sm:mr-2"
        />
        <button
          className="my-1 p-1 mx-2 px-2 border-2 border-white rounded-2xl text-white flex items-center"
          onClick={handleSearchClick}
        >
          Search <IoSearchOutline className="ml-1" />
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : weatherData ? (
        <div className="flex flex-col items-center">
          {/* <TiWeatherShower className="text-9xl text-white mb-5" /> */}
          {weatherIconMappings[weatherData.weather[0].main]}
          <h1 className="text-2xl text-white mb-5">{weatherData.main.temp}°C</h1>
          <h1 className="text-3xl text-white mb-5">{weatherData.name}</h1>
          <h6 className="text-white mb-5">feels like {weatherData.weather[0].description}</h6>
        </div>
      ) : null}

      {!loading && weatherData ? (
        <div className="mt-5 flex-wrap justify-center text-center text-white details flex-row flex space-x-5 ">
          {/* Humidity ----------------------------*/}
          <div className="col p-10 mb-8 border-4 border-white hover:border-blue-900 cursor-pointer rounded-md">
            <WiHumidity className="text-4xl text-blue-900 ml-3" />
            <p>Humidity</p>
            <p>{weatherData.main.humidity}</p>
          </div>
          {/* Wind Speed ----------------------------*/}
          <div className="col py-9 px-8 mb-8 border-4 border-white hover:border-teal-800 cursor-pointer rounded-md">
            <LuWind className="text-4xl text-teal-800 ml-5" />
            <p>Wind Speed</p>
            <p>{weatherData.wind.speed} m/s</p>
          </div>
          {/* Sunrise ----------------------------*/}
          <div className="col p-10 mb-8 border-4 border-white hover:border-yellow-400 cursor-pointer rounded-md">
            <WiSunrise className="text-4xl text-yellow-400 ml-4" />
            <p>Sunrise at</p>
            <p>{convertUnixTimestampToTime(weatherData.sys.sunrise)}</p>
          </div>
          {/* Sunset ----------------------------*/}
          <div className="col p-10 mb-8 border-4 border-white hover:border-orange-500 cursor-pointer rounded-md">
            <WiSunset className="text-4xl text-orange-500 ml-4" />
            <p>Sunset at</p>
            <p>{convertUnixTimestampToTime(weatherData.sys.sunset)}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
