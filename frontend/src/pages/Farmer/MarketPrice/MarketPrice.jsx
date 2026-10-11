import { useContext, useMemo } from "react";
import "./MarketPrice.css";
import { FarmContext } from "../../../context/FarmContext";

function MarketPrice() {

    const { farms } = useContext(FarmContext);

    const farm = farms && farms.length > 0
        ? farms[0]
        : null;


    const marketData = {

        Paddy: {
            base: 32,
            demand: "High",
            supply: "Medium"
        },

        Sugarcane: {
            base: 38,
            demand: "High",
            supply: "Medium"
        },

        Banana: {
            base: 45,
            demand: "Medium",
            supply: "High"
        },

        Tomato: {
            base: 30,
            demand: "High",
            supply: "Medium"
        },

        Maize: {
            base: 24,
            demand: "Medium",
            supply: "Medium"
        },

        Cotton: {
            base: 72,
            demand: "High",
            supply: "Low"
        }

    };


    const market = useMemo(() => {

        if (!farm) return null;

        const crop = farm.cropType || "Paddy";

        const data =
            marketData[crop] || {
                base: 30,
                demand: "Medium",
                supply: "Medium"
            };


        const month = new Date().getMonth() + 1;

        let season = "";

        if (month >= 6 && month <= 9) {
            season = "Monsoon";
        } else if (month >= 10 && month <= 12) {
            season = "Post Monsoon";
        } else if (month >= 1 && month <= 2) {
            season = "Winter";
        } else {
            season = "Summer";
        }


        let demandFactor = 1;

        if (data.demand === "High") {
            demandFactor = 1.15;
        } else if (data.demand === "Low") {
            demandFactor = 0.90;
        }


        let seasonFactor = 1;

        if (season === "Summer") {
            seasonFactor = 1.05;
        } else if (season === "Monsoon") {
            seasonFactor = 0.98;
        } else if (season === "Post Monsoon") {
            seasonFactor = 1.08;
        } else {
            seasonFactor = 1.02;
        }


        const finalPrice =
            Math.round(
                data.base *
                demandFactor *
                seasonFactor
            );


        let trend = "Stable";
        let trendIcon = "→";

        if (data.demand === "High") {
            trend = "Increasing";
            trendIcon = "↗";
        } else if (data.demand === "Low") {
            trend = "Decreasing";
            trendIcon = "↘";
        }


        return {
            crop,
            season,
            demand: data.demand,
            supply: data.supply,
            price: finalPrice,
            trend,
            trendIcon
        };

    }, [farm]);


    return (

        <div className="market-price-page">

            <div className="market-price-header">

                <h1>📈 Smart Market Price</h1>

                <p>
                    Estimated market price based on crop,
                    season, demand and supply.
                </p>

            </div>


            {!farm ? (

                <div className="market-empty">

                    <h2>🌾 No Farm Added</h2>

                    <p>
                        Add a farm to view market prices.
                    </p>

                </div>

            ) : (

                <>

                    <div className="market-farm-card">

                        <div className="market-icon">
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


                    <div className="market-grid">

                        <div className="market-card">

                            <div className="card-icon">
                                🌱
                            </div>

                            <h3>Crop</h3>

                            <h2>
                                {market.crop}
                            </h2>

                        </div>


                        <div className="market-card">

                            <div className="card-icon">
                                📅
                            </div>

                            <h3>Current Season</h3>

                            <h2>
                                {market.season}
                            </h2>

                        </div>


                        <div className="market-card">

                            <div className="card-icon">
                                📈
                            </div>

                            <h3>Demand</h3>

                            <h2>
                                {market.demand}
                            </h2>

                        </div>


                        <div className="market-card">

                            <div className="card-icon">
                                📦
                            </div>

                            <h3>Supply</h3>

                            <h2>
                                {market.supply}
                            </h2>

                        </div>

                    </div>


                    <div className="price-main-card">

                        <p>
                            Estimated Current Market Price
                        </p>

                        <h1>
                            ₹{market.price}
                            <span> / kg</span>
                        </h1>

                        <div className="trend-box">

                            <span>
                                {market.trendIcon}
                            </span>

                            <strong>
                                {market.trend}
                            </strong>

                        </div>

                    </div>


                    <div className="price-info">

                        <h2>
                            📊 Market Analysis
                        </h2>


                        <div className="price-row">

                            <span>Crop</span>

                            <strong>
                                {market.crop}
                            </strong>

                        </div>


                        <div className="price-row">

                            <span>Season</span>

                            <strong>
                                {market.season}
                            </strong>

                        </div>


                        <div className="price-row">

                            <span>Demand</span>

                            <strong>
                                {market.demand}
                            </strong>

                        </div>


                        <div className="price-row">

                            <span>Supply</span>

                            <strong>
                                {market.supply}
                            </strong>

                        </div>


                        <div className="price-row">

                            <span>Estimated Price</span>

                            <strong>
                                ₹{market.price} / kg
                            </strong>

                        </div>

                    </div>


                    <div className="market-note">

                        💡 Price is an estimated demonstration
                        based on crop demand, supply and seasonal
                        factors. Actual local market prices may vary.

                    </div>

                </>

            )}

        </div>

    );

}

export default MarketPrice;