import { useContext, useEffect, useState } from "react";
import "./Irrigation.css";
import { FarmContext } from "../../../context/FarmContext";

function Irrigation() {

    const { farms } = useContext(FarmContext);

    const [weather, setWeather] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const [waterAmount, setWaterAmount] = useState("");
    const [method, setMethod] = useState("Drip");
    const [notes, setNotes] = useState("");


    const farm =
        farms && farms.length > 0
            ? farms[0]
            : null;


    useEffect(() => {

        if (farm) {

            getWeather(farm.location);
            getHistory(farm.id);

        }

    }, [farm]);


    const getWeather = async (location) => {

        try {

            setLoading(true);


            const locationResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
            );


            const locationData =
                await locationResponse.json();


            if (
                !locationData.results ||
                locationData.results.length === 0
            ) {

                setLoading(false);

                return;
            }


            const selectedLocation =
                locationData.results[0];


            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&current=temperature_2m,relative_humidity_2m,precipitation&daily=precipitation_probability_max&timezone=auto`
            );


            const weatherData =
                await weatherResponse.json();


            setWeather({

                temperature:
                    weatherData.current.temperature_2m,

                humidity:
                    weatherData.current.relative_humidity_2m,

                precipitation:
                    weatherData.current.precipitation,

                rainChance:
                    weatherData.daily
                        .precipitation_probability_max[0]

            });


        } catch (error) {

            console.log(
                "Weather error:",
                error
            );

        }

        setLoading(false);

    };


    const getHistory = async (farmId) => {

        try {

            const response = await fetch(
                `http://localhost:8080/api/irrigations/farm/${farmId}`,
                {
                    cache: "no-store"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to get irrigation history"
                );

            }


            const data =
                await response.json();

            setHistory(data);


        } catch (error) {

            console.log(
                "Irrigation history error:",
                error
            );

        }

    };


    const recordIrrigation = async (e) => {

        e.preventDefault();


        if (!farm) {

            alert("Please add a farm first.");

            return;
        }


        if (
            !waterAmount ||
            Number(waterAmount) <= 0
        ) {

            alert(
                "Please enter a valid water amount."
            );

            return;
        }


        const irrigation = {

            waterAmount:
                Number(waterAmount),

            method:
                method,

            notes:
                notes,

            farm: {
                id: farm.id
            }

        };


        try {

            const response = await fetch(
                "http://localhost:8080/api/irrigations",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(irrigation)
                }
            );


            if (!response.ok) {

                const message =
                    await response.text();

                alert(
                    message ||
                    "Failed to record irrigation ❌"
                );

                return;
            }


            alert(
                "Irrigation recorded successfully ✅"
            );


            setWaterAmount("");
            setNotes("");


            getHistory(farm.id);


        } catch (error) {

            console.log(
                "Record irrigation error:",
                error
            );

            alert(
                "Backend connection error ❌"
            );

        }

    };


    const getRecommendation = () => {

        if (!weather) {

            return {
                title: "Weather unavailable",
                message:
                    "Weather information is not available yet.",
                className: "recommendation-wait"
            };

        }


        const lastIrrigation =
            history.length > 0
                ? history[0]
                : null;


        let hoursSinceIrrigation = null;


        if (lastIrrigation) {

            const lastDate =
                new Date(
                    lastIrrigation.irrigationDate
                );

            hoursSinceIrrigation =
                (
                    new Date() - lastDate
                ) /
                (1000 * 60 * 60);

        }


        const rainChance =
            Number(
                weather.rainChance || 0
            );


        const temperature =
            Number(
                weather.temperature || 0
            );


        const crop =
            (
                farm?.cropType || ""
            ).toLowerCase();


        /*
         * Basic recommendation rules
         *
         * Rain expected -> avoid irrigation
         * Recently irrigated -> wait
         * Hot + low rain -> irrigation recommended
         */

        if (rainChance >= 60) {

            return {
                title: "🌧️ Irrigation Not Recommended",
                message:
                    "Rain is likely in your farm area. Avoid unnecessary irrigation and monitor the soil.",
                className: "recommendation-stop"
            };

        }


        if (
            hoursSinceIrrigation !== null &&
            hoursSinceIrrigation < 12
        ) {

            return {
                title: "⏳ Wait Before Irrigating",
                message:
                    "Your farm was irrigated recently. Check soil moisture before watering again.",
                className: "recommendation-wait"
            };

        }


        if (
            temperature >= 30 &&
            rainChance < 30
        ) {

            return {
                title: "💧 Irrigation Recommended",
                message:
                    `The weather is relatively hot and the rain chance is low. Monitor soil moisture for your ${farm.cropType || "crop"} and irrigate if the soil is dry.`,
                className: "recommendation-go"
            };

        }


        if (
            crop.includes("paddy") &&
            rainChance < 40
        ) {

            return {
                title: "💧 Monitor Paddy Water Level",
                message:
                    "Paddy generally needs more consistent water. Check the field moisture and water level before irrigation.",
                className: "recommendation-go"
            };

        }


        return {
            title: "🌱 Monitor Soil Moisture",
            message:
                "Current conditions do not strongly indicate immediate irrigation. Check soil moisture before deciding.",
            className: "recommendation-wait"
        };

    };


    const recommendation =
        getRecommendation();


    return (

        <div className="irrigation-page">

            <div className="irrigation-header">

                <h1>
                    💧 Smart Irrigation
                </h1>

                <p>
                    Irrigation recommendation based on your crop, weather and previous irrigation.
                </p>

            </div>


            {!farm ? (

                <div className="irrigation-empty">

                    <div>
                        🌾
                    </div>

                    <h2>
                        No Farm Added
                    </h2>

                    <p>
                        Add a farm first to use Smart Irrigation.
                    </p>

                </div>

            ) : (

                <>

                    {/* Farm Information */}

                    <div className="farm-irrigation-card">

                        <div className="farm-irrigation-icon">
                            🌾
                        </div>

                        <div>

                            <p>
                                Current Farm
                            </p>

                            <h2>
                                {farm.farmName}
                            </h2>

                            <span>
                                📍 {farm.location}
                            </span>

                        </div>

                    </div>


                    {/* Current Conditions */}

                    <div className="irrigation-grid">

                        <div className="irrigation-card">

                            <div className="irrigation-card-icon">
                                🌱
                            </div>

                            <h3>
                                Crop
                            </h3>

                            <h2>
                                {farm.cropType}
                            </h2>

                            <p>
                                Current crop
                            </p>

                        </div>


                        <div className="irrigation-card">

                            <div className="irrigation-card-icon">
                                🌡️
                            </div>

                            <h3>
                                Temperature
                            </h3>

                            <h2>
                                {weather
                                    ? `${weather.temperature}°C`
                                    : "--"}
                            </h2>

                            <p>
                                Current temperature
                            </p>

                        </div>


                        <div className="irrigation-card">

                            <div className="irrigation-card-icon">
                                🌧️
                            </div>

                            <h3>
                                Rain Chance
                            </h3>

                            <h2>
                                {weather
                                    ? `${weather.rainChance}%`
                                    : "--"}
                            </h2>

                            <p>
                                Today's probability
                            </p>

                        </div>


                        <div className="irrigation-card">

                            <div className="irrigation-card-icon">
                                💧
                            </div>

                            <h3>
                                Humidity
                            </h3>

                            <h2>
                                {weather
                                    ? `${weather.humidity}%`
                                    : "--"}
                            </h2>

                            <p>
                                Current humidity
                            </p>

                        </div>

                    </div>


                    {/* Recommendation */}

                    <div
                        className={`irrigation-advice ${recommendation.className}`}
                    >

                        <h2>
                            {recommendation.title}
                        </h2>

                        <p>
                            {loading
                                ? "Getting current weather..."
                                : recommendation.message}
                        </p>

                    </div>


                    {/* Record Irrigation */}

                    <div className="record-irrigation">

                        <h2>
                            ➕ Record Irrigation
                        </h2>

                        <p>
                            Save today's irrigation so future recommendations can consider your irrigation history.
                        </p>


                        <form
                            onSubmit={recordIrrigation}
                            className="irrigation-form"
                        >

                            <div className="form-group">

                                <label>
                                    Water Amount
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Enter water amount"
                                    value={waterAmount}
                                    onChange={(e) =>
                                        setWaterAmount(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Irrigation Method
                                </label>

                                <select
                                    value={method}
                                    onChange={(e) =>
                                        setMethod(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option>
                                        Drip
                                    </option>

                                    <option>
                                        Sprinkler
                                    </option>

                                    <option>
                                        Flood
                                    </option>

                                    <option>
                                        Manual
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Notes
                                </label>

                                <textarea
                                    rows="3"
                                    placeholder="Optional notes"
                                    value={notes}
                                    onChange={(e) =>
                                        setNotes(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            <button
                                type="submit"
                                className="record-btn"
                            >
                                Save Irrigation
                            </button>

                        </form>

                    </div>


                    {/* History */}

                    <div className="irrigation-history">

                        <h2>
                            📋 Previous Irrigations
                        </h2>


                        {history.length === 0 ? (

                            <p>
                                No previous irrigation records.
                            </p>

                        ) : (

                            <div className="history-list">

                                {history
                                    .slice(0, 5)
                                    .map((item) => (

                                        <div
                                            className="history-item"
                                            key={item.id}
                                        >

                                            <div>

                                                <strong>
                                                    💧 {item.waterAmount}
                                                </strong>

                                                <span>
                                                    {item.method}
                                                </span>

                                            </div>


                                            <div>

                                                <p>
                                                    {new Date(
                                                        item.irrigationDate
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </p>

                                                {item.notes && (

                                                    <small>
                                                        {item.notes}
                                                    </small>

                                                )}

                                            </div>

                                        </div>

                                    ))}

                            </div>

                        )}

                    </div>

                </>

            )}

        </div>

    );

}

export default Irrigation;