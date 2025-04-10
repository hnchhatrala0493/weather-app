import "./Weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"

const Weather = () => {
  const inputRefs = useRef();
  const [WeatherData,setWeatherData]=useState(false);
  const allIcons= {
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  }
  const search = async(city) =>{
    if(city===""){
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&unites=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      // const sunRiseTime = data.sys.sunrise;
      // const sunSetTime = data.sys.sunset;
      // const sunRiseDate = new Date(sunRiseTime * 1000);
      // const subSetDate = new Date(sunSetTime * 1000);
      // const istOffset = 5.5 * 60 * 60 * 1000;
      // const sunRise = new Date(sunRiseDate.getTime() + istOffset);
      // const sunSet = new Date(subSetDate.getTime() + istOffset);
      if(!response.ok){
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      
      
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon:icon,
        timezone:data.timezone,
        // sunrise:sunRiseDate,
        // sunset:subSetDate,
      });
      console.log(WeatherData);
          
    } catch (error) {
      setWeatherData(false)
      console.log(error);
    }
  }
  useEffect(()=>{
    //search("Ahmedabad");
  },[]);
  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type='text' ref={inputRefs} placeholder='Search City' />
            <img src={search_icon} alt="" onClick={()=>search(inputRefs.current.value)} />            
        </div>
        {WeatherData?
        <>
          <img src={WeatherData.icon} alt="" className="weather-icon"  />        
          <p className='temperature'>{WeatherData.temperature}</p>
          <p className='location'>{WeatherData.location}</p>
          <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{WeatherData.humidity}</p>
                  <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{WeatherData.windSpeed} Km/h</p>
                  <span>Wind</span>
                </div>
            </div>
          </div>          
        </>:<>
        </>}
    </div>
  )
}

export default Weather