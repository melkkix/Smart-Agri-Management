import { useEffect, useState } from "react";

import {
    FaTemperatureHigh,
    FaTint,
    FaWind,
    FaCloudSun,
    FaCloud,
    FaSun,
    FaCloudRain
} from "react-icons/fa";

import "./WeatherWidget.css";


function WeatherWidget() {

    const [weather, setWeather] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    // =========================================
    // GET LOGGED-IN FARMER
    // =========================================

    const getUser = () => {

        const userData =
            localStorage.getItem(
                "smartAgriUser"
            );


        if (!userData) {

            return null;

        }


        try {

            return JSON.parse(
                userData
            );

        } catch {

            return null;

        }

    };


    // =========================================
    // WEATHER DESCRIPTION
    // =========================================

    const getWeatherDescription = (
        code
    ) => {

        if (code === 0) {

            return "Clear Sky";

        }


        if (
            code === 1 ||
            code === 2
        ) {

            return "Partly Cloudy";

        }


        if (code === 3) {

            return "Cloudy";

        }


        if (
            code >= 45 &&
            code <= 48
        ) {

            return "Foggy";

        }


        if (
            code >= 51 &&
            code <= 67
        ) {

            return "Rain";

        }


        if (
            code >= 71 &&
            code <= 77
        ) {

            return "Snow";

        }


        if (
            code >= 80 &&
            code <= 82
        ) {

            return "Rain Showers";

        }


        if (
            code >= 95 &&
            code <= 99
        ) {

            return "Thunderstorm";

        }


        return "Unknown";

    };


    // =========================================
    // WEATHER ICON
    // =========================================

    const getWeatherIcon = (
        code
    ) => {

        if (code === 0) {

            return <FaSun />;

        }


        if (
            code === 1 ||
            code === 2
        ) {

            return <FaCloudSun />;

        }


        if (code === 3) {

            return <FaCloud />;

        }


        if (
            code >= 51 &&
            code <= 82
        ) {

            return <FaCloudRain />;

        }


        if (
            code >= 95 &&
            code <= 99
        ) {

            return <FaCloudRain />;

        }


        return <FaCloudSun />;

    };


    // =========================================
    // GET WEATHER
    // =========================================

    const getWeather = async (
        location
    ) => {

        try {

            let searchLocation =
                location.trim();


            // Fix old typo used in your farm data

            if (
                searchLocation.toLowerCase()
                === "trchy"
            ) {

                searchLocation =
                    "Trichy";

            }


            // =================================
            // GEOCODING
            // =================================

            const geoResponse =
                await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                        searchLocation
                    )}&count=1&language=en&format=json`
                );


            if (!geoResponse.ok) {

                throw new Error(
                    "Location not found"
                );

            }


            const geoData =
                await geoResponse.json();


            if (
                !geoData.results ||
                geoData.results.length === 0
            ) {

                throw new Error(
                    "Could not find farm location"
                );

            }


            const place =
                geoData.results[0];


            // =================================
            // WEATHER API
            // =================================

            const weatherResponse =
                await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`
                );


            if (!weatherResponse.ok) {

                throw new Error(
                    "Weather API failed"
                );

            }


            const weatherData =
                await weatherResponse.json();


            const current =
                weatherData.current;


            if (!current) {

                throw new Error(
                    "Current weather unavailable"
                );

            }


            setWeather({

                temperature:
                    Math.round(
                        current.temperature_2m
                    ),

                feelsLike:
                    Math.round(
                        current.apparent_temperature
                    ),

                humidity:
                    Math.round(
                        current.relative_humidity_2m
                    ),

                wind:
                    Math.round(
                        current.wind_speed_10m
                    ),

                code:
                    current.weather_code,

                location:
                    place.name

            });


        } catch (error) {

            console.log(
                "Weather error:",
                error
            );


            setWeather(null);

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // LOAD FARM LOCATION
    // =========================================

    const loadWeather = async () => {

        try {

            const user =
                getUser();


            if (
                !user ||
                !user.id ||
                user.role !== "Farmer"
            ) {

                setLoading(false);

                return;

            }


            const response =
                await fetch(
                    `http://localhost:8080/api/farms?farmerId=${user.id}`,
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to get farms"
                );

            }


            const farms =
                await response.json();


            if (
                !farms ||
                farms.length === 0
            ) {

                setWeather(null);

                setLoading(false);

                return;

            }


            // Use the farmer's first farm

            const location =
                farms[0].location;


            if (!location) {

                setWeather(null);

                setLoading(false);

                return;

            }


            await getWeather(
                location
            );


        } catch (error) {

            console.log(
                "Weather loading error:",
                error
            );

            setWeather(null);

            setLoading(false);

        }

    };


    // =========================================
    // LOAD WEATHER + REFRESH
    // =========================================

    useEffect(() => {

        loadWeather();


        const interval =
            setInterval(
                loadWeather,
                10 * 60 * 1000
            );


        return () => {

            clearInterval(
                interval
            );

        };

    }, []);


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="weather-widget">

                <div className="weather-header">

                    <h2>
                        Today's Weather
                    </h2>

                    <FaCloudSun
                        className="weather-main-icon"
                    />

                </div>

                <h1>
                    --°C
                </h1>

                <p className="weather-condition">
                    Loading weather...
                </p>

            </div>

        );

    }


    // =========================================
    // NO WEATHER
    // =========================================

    if (!weather) {

        return (

            <div className="weather-widget">

                <div className="weather-header">

                    <h2>
                        Today's Weather
                    </h2>

                    <FaCloudSun
                        className="weather-main-icon"
                    />

                </div>

                <h1>
                    --°C
                </h1>

                <p className="weather-condition">
                    Add a farm location to see weather.
                </p>

            </div>

        );

    }


    // =========================================
    // DISPLAY
    // =========================================

    return (

        <div className="weather-widget">

            <div className="weather-header">

                <div>

                    <h2>
                        Today's Weather
                    </h2>

                    <p className="weather-location">
                        {weather.location}
                    </p>

                </div>


                <div className="weather-main-icon">

                    {getWeatherIcon(
                        weather.code
                    )}

                </div>

            </div>


            <h1>
                {weather.temperature}°C
            </h1>


            <p className="weather-condition">

                {getWeatherDescription(
                    weather.code
                )}

            </p>


            <div className="weather-details">


                {/* FEELS LIKE */}

                <div className="weather-item">

                    <FaTemperatureHigh />

                    <span>

                        Feels Like

                        <strong>
                            {weather.feelsLike}°C
                        </strong>

                    </span>

                </div>


                {/* HUMIDITY */}

                <div className="weather-item">

                    <FaTint />

                    <span>

                        Humidity

                        <strong>
                            {weather.humidity}%
                        </strong>

                    </span>

                </div>


                {/* WIND */}

                <div className="weather-item">

                    <FaWind />

                    <span>

                        Wind

                        <strong>
                            {weather.wind} km/h
                        </strong>

                    </span>

                </div>


            </div>

        </div>

    );

}


export default WeatherWidget;