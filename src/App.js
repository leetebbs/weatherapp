import { useState, useEffect } from "react";
import axios from "axios";
import sunset from './assets/sunset.jpg'


function App() {
  
  const apiKey = process.env.REACT_APP_ACCESS_KEY;
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [timeOfDay, setTimeOfDay] = useState('');
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
  
        if (hours >= 6 && hours < 12) {
          setTimeOfDay('morning');
        } else if (hours >= 12 && hours < 18) {
          setTimeOfDay('afternoon');
        } else if (hours >= 18 && hours < 21) {
          setTimeOfDay('evening');
        } else {
          setTimeOfDay('night');
        }
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);

  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},gb&appid=6ad02853c30fd4d8a2edfcf965c7c8d1&units=metric`;

  const searchLoaction = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
     <div className={`App ${timeOfDay}`}>
        <p className="test fun">{timeOfDay}</p>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLoaction}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
          {data.weather ? <div className="time">{time}</div> : null}
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} °C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.main ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind</p>
            </div>
          </div>
        )}
      </div>
     
   </div>
  );
}

export default App;
