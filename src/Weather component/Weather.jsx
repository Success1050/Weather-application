import { useEffect, useState } from "react";
import clearImg from "./Assets/clear.png";
import cloudImg from "./Assets/cloud.png";
import drizzleImg from "./Assets/drizzle.png";
import humidityImg from "./Assets/humidity.png";
import rainImg from "./Assets/rain.png";
import searchImg from "./Assets/search.png";
import snowImg from "./Assets/snow.png";
import windImg from "./Assets/wind.png";
import axios from "axios";

const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [city, setCity] = useState({
    name: "London",
    celsius: 24,
    humdity: 64,
    windSpeed: 18,
    image: snowImg,
  });
  // const [isloading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    let api_key = "d6bd321519f92ac35aafff09949d76e1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;

    if (!cityName) return;
    try {
      const data = await axios(url);
      let imagePath = "";
      if (
        data.data.weather[0].icon === "01d" ||
        data.data.weather[0].icon === "01n"
      ) {
        imagePath = clearImg;
      } else if (
        data.data.weather[0].icon === "02d" ||
        data.data.weather[0].icon === "02n"
      ) {
        imagePath = cloudImg;
      } else if (
        data.data.weather[0].icon === "03d" ||
        data.data.weather[0].icon === "03n"
      ) {
        imagePath = drizzleImg;
      } else if (
        data.data.weather[0].icon === "04d" ||
        data.data.weather[0].icon === "04n"
      ) {
        imagePath = drizzleImg;
      } else if (
        data.data.weather[0].icon === "09d" ||
        data.data.weather[0].icon === "09n"
      ) {
        imagePath = rainImg;
      } else if (
        data.data.weather[0].icon === "10d" ||
        data.data.weather[0].icon === "10n"
      ) {
        imagePath = rainImg;
      } else if (
        data.data.weather[0].icon === "13d" ||
        data.data.weather[0].icon === "13n"
      ) {
        imagePath = snowImg;
      } else {
        imagePath = clearImg;
      }

      const { name } = data.data;
      const { temp } = data.data.main;
      const { speed } = data.data.wind;
      setCity({
        ...city,
        name: name,
        celsius: temp,
        humdity: data.data.main.humidity,
        windSpeed: speed,
        image: imagePath,
      });

      console.log(data.data);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
    setCityName("");
  };

  // if (isloading) {
  //   return <div>loading</div>;
  // }

  if (isError) {
    return <div>error</div>;
  }

  return (
    <>
      <div className='container1 rounded-xl mt-7 flex flex-col items-center'>
        <div className='topbar relative pr-12 pt-16'>
          <input
            type='text'
            value={cityName}
            className=' pl-10 text-xl font-normal'
            onChange={(e) => {
              // console.log(e);
              setCityName(e.target.value);
            }}
            placeholder='search'
          />
          <div
            className='searchIcon absolute bottom-1 left-72  items-center w-14 h-14 pt-3 pl-3 rounded-full cursor-pointer bg-slate-100'
            onClick={() => handleSubmit()}
          >
            <img src={searchImg} className='w-7' />
          </div>
        </div>

        <div className='weather-image mt-7 flex basis-10 justify-center mb-3'>
          <img src={city.image} className='icon-img w-44' />
        </div>
        <div className='weather-temp flex justify-center text-white text-5xl font-normal mb-2'>
          {city.celsius}℃
        </div>
        <div className='weather-location flex justify-center text-white text-3xl font-normal'>
          {city.name}
        </div>
        <div className='data-container mt-12 font-medium text-white flex items-center gap-20 mb-14 '>
          <div className='humidity m-auto flex items-start gap-3'>
            <img src={humidityImg} className='icon' />
            <div className='text-sm '>
              <div className='humidity-percent'>{city.humdity}%</div>
              <div className='text'>Humidity</div>
            </div>
          </div>

          <div className='humidity m-auto flex items-start  gap-3'>
            <img src={windImg} alt='' className='icon' />
            <div className='text-sm font-normal'>
              <div className='humidity-percent'>{city.windSpeed}km/hr</div>
              <div className='text'>Wind speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
