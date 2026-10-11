import { useEffect, useState, useContext } from "react";
import "./Weather.css";
import { FarmContext } from "../../../context/FarmContext";

function Weather() {

    const { farms } = useContext(FarmContext);

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        if (farms && farms.length > 0) {

            getWeather(farms[0].location);

        }

    }, [farms]);


    const getWeather = async (location) => {

        if (!location) {

            alert("Farm location is not available.");

            return;
        }


        try {

            setLoading(true);


            // Get coordinates from farm location

            const locationResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
            );


            const locationData =
                await locationResponse.json();


            if (
                !locationData.results ||
                locationData.results.length === 0
            ) {

                alert(
                    `Weather location not found for ${location}.`
                );

                setLoading(false);

                return;
            }


            const farmLocation =
                locationData.results[0];


            // Get weather for farm location

            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${farmLocation.latitude}&longitude=${farmLocation.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
            );


            const weatherData =
                await weatherResponse.json();


            setWeather({

                location: location,

                country:
                    farmLocation.country,

                temperature:
                    weatherData.current.temperature_2m,

                humidity:
                    weatherData.current.relative_humidity_2m,

                feelsLike:
                    weatherData.current.apparent_temperature,

                wind:
                    weatherData.current.wind_speed_10m,

                weatherCode:
                    weatherData.current.weather_code,

                max:
                    weatherData.daily.temperature_2m_max[0],

                min:
                    weatherData.daily.temperature_2m_min[0],

                rain:
                    weatherData.daily.precipitation_probability_max[0]

            });


        } catch (error) {

            console.log(
                "Weather error:",
                error
            );

            alert(
                "Unable to get weather data ❌"
            );

        }


        setLoading(false);

    };


    const getWeatherText = (code) => {

        if (code === 0) {
            return "Clear Sky ☀️";
        }

        if (code <= 3) {
            return "Partly Cloudy ⛅";
        }

        if (code >= 51 && code <= 67) {
            return "Rainy 🌧️";
        }

        if (code >= 71 && code <= 77) {
            return "Snowy ❄️";
        }

        if (code >= 80 && code <= 82) {
            return "Rain Showers 🌦️";
        }

        if (code >= 95) {
            return "Thunderstorm ⛈️";
        }

        return "Cloudy ☁️";

    };


    return (

        <div className="weather-page">

            <div className="weather-header">

                <h1>
                    🌤️ Farm Weather
                </h1>

                <p>
                    Current weather based on your farm location.
                </p>

            </div>


            {farms && farms.length === 0 ? (

                <div className="weather-empty">

                    <div>
                        🌾
                    </div>

                    <h2>
                        No Farm Added
                    </h2>

                    <p>
                        Please add a farm with a location to view weather.
                    </p>

                </div>

            ) : (

                <>

                    <div className="farm-location-card">

                        <span>
                            📍
                        </span>

                        <div>

                            <p>
                                Weather for your farm
                            </p>

                            <h2>
                                {farms[0]?.farmName}
                            </h2>

                            <strong>
                                {farms[0]?.location}
                            </strong>

                        </div>

                    </div>


                    {loading ? (

                        <div className="weather-empty">

                            <h2>
                                🌤️ Loading Weather...
                            </h2>

                            <p>
                                Getting weather for your farm location.
                            </p>

                        </div>

                    ) : weather ? (

                        <div className="weather-card">

                            <div className="weather-main">

                                <div>

                                    <h2>
                                        {weather.location}
                                    </h2>

                                    <p>
                                        {weather.country}
                                    </p>

                                </div>


                                <div className="weather-icon">
                                    🌤️
                                </div>

                            </div>


                            <h1 className="temperature">
                                {weather.temperature}°C
                            </h1>


                            <h3>
                                {getWeatherText(
                                    weather.weatherCode
                                )}
                            </h3>


                            <div className="weather-details">

                                <div>

                                    <span>
                                        🌡️
                                    </span>

                                    <p>
                                        Feels Like
                                    </p>

                                    <strong>
                                        {weather.feelsLike}°C
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        💧
                                    </span>

                                    <p>
                                        Humidity
                                    </p>

                                    <strong>
                                        {weather.humidity}%
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        💨
                                    </span>

                                    <p>
                                        Wind Speed
                                    </p>

                                    <strong>
                                        {weather.wind} km/h
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        🌧️
                                    </span>

                                    <p>
                                        Rain Chance
                                    </p>

                                    <strong>
                                        {weather.rain}%
                                    </strong>

                                </div>

                            </div>


                            <div className="temperature-range">

                                <div>

                                    <p>
                                        Today's Maximum
                                    </p>

                                    <strong>
                                        {weather.max}°C
                                    </strong>

                                </div>


                                <div>

                                    <p>
                                        Today's Minimum
                                    </p>

                                    <strong>
                                        {weather.min}°C
                                    </strong>

                                </div>

                            </div>

                        </div>

                    ) : null}

                </>

            )}

        </div>

    );

}

export default Weather;