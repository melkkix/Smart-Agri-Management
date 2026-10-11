import { useContext, useEffect, useState } from "react";
import "./Fertilizer.css";
import { FarmContext } from "../../../context/FarmContext";

function Fertilizer() {

    const { farms } = useContext(FarmContext);

    const [recommendation, setRecommendation] = useState(null);

    const farm = farms && farms.length > 0 ? farms[0] : null;


    useEffect(() => {

        if (farm) {
            getRecommendation();
        }

    }, [farm]);


    const getRecommendation = () => {

        const crop = (farm.cropType || "").toLowerCase();
        const soil = (farm.soilType || "").toLowerCase();

        let data = {
            fertilizer: "Balanced NPK",
            npk: "10-10-10",
            reason: "Suitable general fertilizer for crop growth.",
            advice: "Apply according to the crop requirement and soil condition."
        };


        if (crop.includes("tomato")) {

            data = {
                fertilizer: "NPK 19-19-19",
                npk: "19-19-19",
                reason: "Tomato requires balanced nutrients for healthy vegetative and fruit growth.",
                advice: "Use split applications and avoid excessive nitrogen."
            };

        } else if (crop.includes("paddy")) {

            data = {
                fertilizer: "NPK 17-17-17",
                npk: "17-17-17",
                reason: "Paddy requires nitrogen along with phosphorus and potassium.",
                advice: "Apply fertilizer in stages according to the crop growth stage."
            };

        } else if (crop.includes("sugarcane")) {

            data = {
                fertilizer: "NPK 20-10-10",
                npk: "20-10-10",
                reason: "Sugarcane has a high nutrient requirement during growth.",
                advice: "Use split applications rather than applying all fertilizer at once."
            };

        } else if (crop.includes("banana")) {

            data = {
                fertilizer: "NPK 10-10-20",
                npk: "10-10-20",
                reason: "Banana benefits from higher potassium during growth and fruit development.",
                advice: "Maintain adequate potassium and monitor soil moisture."
            };

        } else if (crop.includes("maize")) {

            data = {
                fertilizer: "NPK 20-20-20",
                npk: "20-20-20",
                reason: "Maize needs balanced nutrients during early and active growth.",
                advice: "Apply nitrogen in split doses for better nutrient use."
            };

        } else if (crop.includes("cotton")) {

            data = {
                fertilizer: "NPK 15-15-15",
                npk: "15-15-15",
                reason: "Cotton benefits from balanced nutrition during early growth.",
                advice: "Avoid excessive nitrogen because it can encourage excessive leaf growth."
            };

        }


        if (soil.includes("red")) {

            data.reason +=
                " Red soil can benefit from proper organic matter and nutrient management.";

        } else if (soil.includes("black")) {

            data.reason +=
                " Black soil generally retains nutrients and moisture well, so avoid over-fertilization.";

        } else if (soil.includes("sandy")) {

            data.reason +=
                " Sandy soil may require smaller and more frequent fertilizer applications.";

        } else if (soil.includes("clay")) {

            data.reason +=
                " Clay soil can retain nutrients, so fertilizer should be applied carefully.";

        }


        setRecommendation(data);

    };


    return (

        <div className="fertilizer-page">

            <div className="fertilizer-header">

                <h1>🧪 Smart Fertilizer</h1>

                <p>
                    Fertilizer recommendation based on your crop and soil type.
                </p>

            </div>


            {!farm ? (

                <div className="fertilizer-empty">

                    <div>🌾</div>

                    <h2>No Farm Added</h2>

                    <p>
                        Add a farm first to get fertilizer recommendations.
                    </p>

                </div>

            ) : (

                <>

                    <div className="fertilizer-farm-card">

                        <div className="farm-icon">
                            🌾
                        </div>

                        <div>

                            <p>Current Farm</p>

                            <h2>
                                {farm.farmName}
                            </h2>

                            <span>
                                📍 {farm.location}
                            </span>

                        </div>

                    </div>


                    <div className="fertilizer-grid">

                        <div className="fertilizer-card">

                            <div className="card-icon">
                                🌱
                            </div>

                            <h3>Crop</h3>

                            <h2>
                                {farm.cropType}
                            </h2>

                        </div>


                        <div className="fertilizer-card">

                            <div className="card-icon">
                                🪨
                            </div>

                            <h3>Soil Type</h3>

                            <h2>
                                {farm.soilType || "Not specified"}
                            </h2>

                        </div>


                        <div className="fertilizer-card">

                            <div className="card-icon">
                                💧
                            </div>

                            <h3>Water Source</h3>

                            <h2>
                                {farm.waterSource || "Not specified"}
                            </h2>

                        </div>

                    </div>


                    {recommendation && (

                        <div className="fertilizer-recommendation">

                            <div className="recommendation-icon">
                                🧪
                            </div>

                            <div>

                                <p>
                                    Recommended Fertilizer
                                </p>

                                <h1>
                                    {recommendation.fertilizer}
                                </h1>

                                <h3>
                                    NPK: {recommendation.npk}
                                </h3>

                                <p>
                                    {recommendation.reason}
                                </p>

                                <div className="fertilizer-advice">

                                    💡 {recommendation.advice}

                                </div>

                            </div>

                        </div>

                    )}


                    <div className="fertilizer-note">

                        <h3>
                            ⚠️ Important
                        </h3>

                        <p>
                            This is a general recommendation. For accurate
                            fertilizer dosage, follow soil-test results and
                            local agricultural guidance.
                        </p>

                    </div>

                </>

            )}

        </div>

    );

}

export default Fertilizer;