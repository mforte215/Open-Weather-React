import React, { useState, useEffect } from 'react';
import classes from './Forecaster.module.css';
import Conditions from '../Conditions/Conditions';

const Forecaster = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [responseObj, setResponseObj] = useState({});

    const uriEncodedCity = encodeURIComponent(city);
    
    useEffect(() => {  
            if ("geolocation" in navigator) {
                console.log("Available");
              } else {
                console.log("Not Available");
              }
        });
   function getForecast(e) {
    e.preventDefault();
    if (city.length === 0) {
        return setError(true);
    }
    fetch( 'https://community-open-weather-map.p.rapidapi.com/weather?units='+unit+'&q='+uriEncodedCity, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": process.env.REACT_APP_API_KEY,
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(response => {
    if (response.cod !== 200) {
        throw new Error()
    }
    console.log(response);
    setResponseObj(response);
    setLoading(false);}).catch(err => {
        setError(true);
        setLoading(false);
        console.log(err.message);
    });
}

   return (
    <div>
    <h2>Find Current Weather Conditions</h2>
    <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={classes.textInput}
                    />
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>
                <button className={classes.Button} type="submit">Get Forecast</button>
            </form>
    <Conditions responseObj={responseObj} error={error} loading={loading} />
</div>
   );

    }

export default Forecaster;