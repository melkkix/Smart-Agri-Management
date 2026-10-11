import { useEffect, useState } from "react";

import "./DashboardCards.css";

import {
    FaTractor,
    FaSeedling,
    FaRupeeSign,
    FaCloudSun
} from "react-icons/fa";


function DashboardCards() {

    const [totalFarms, setTotalFarms] =
        useState(0);

    const [activeCrops, setActiveCrops] =
        useState(0);

    const [revenue, setRevenue] =
        useState(0);

    const [temperature, setTemperature] =
        useState("--");

    const [loading, setLoading] =
        useState(true);


    // =========================================
    // GET LOGGED-IN USER
    // =========================================

    const getLoggedInUser = () => {

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

        } catch (error) {

            console.log(
                "User data error:",
                error
            );

            return null;

        }

    };


    // =========================================
    // LOAD DASHBOARD DATA
    // =========================================

    const loadDashboardData = async () => {

        try {

            const user =
                getLoggedInUser();


            if (
                !user ||
                !user.id ||
                user.role !== "Farmer"
            ) {

                setLoading(false);

                return;

            }


            // =====================================
            // 1. FARMS
            // =====================================

            try {

                const farmResponse =
                    await fetch(
                        `http://localhost:8080/api/farms?farmerId=${user.id}`,
                        {
                            cache: "no-store"
                        }
                    );


                if (!farmResponse.ok) {

                    throw new Error(
                        "Failed to get farms"
                    );

                }


                const farmerFarms =
                    await farmResponse.json();


                // REAL TOTAL FARM COUNT

                setTotalFarms(
                    farmerFarms.length
                );


                // =================================
                // REAL WEATHER
                // =================================

                if (
                    farmerFarms.length > 0
                ) {

                    const location =
                        farmerFarms[0].location;


                    if (location) {

                        getWeather(
                            location
                        );

                    }

                } else {

                    setTemperature(
                        "--"
                    );

                }

            } catch (error) {

                console.log(
                    "Farm data error:",
                    error
                );

            }


            // =====================================
            // 2. PRODUCTS
            // =====================================

            try {

                const productResponse =
                    await fetch(
                        `http://localhost:8080/api/products?farmerId=${user.id}`,
                        {
                            cache: "no-store"
                        }
                    );


                if (!productResponse.ok) {

                    throw new Error(
                        "Failed to get products"
                    );

                }


                const products =
                    await productResponse.json();


                // ONLY PRODUCTS WITH STOCK

                const activeProducts =
                    products.filter(
                        (product) => {

                            return (
                                Number(
                                    product.quantity
                                ) > 0
                            );

                        }
                    );


                setActiveCrops(
                    activeProducts.length
                );

            } catch (error) {

                console.log(
                    "Product data error:",
                    error
                );

            }


            // =====================================
            // 3. ORDERS + REVENUE
            // =====================================

            try {

                const orderResponse =
                    await fetch(
                        `http://localhost:8080/api/orders?farmerId=${user.id}`,
                        {
                            cache: "no-store"
                        }
                    );


                if (!orderResponse.ok) {

                    throw new Error(
                        "Failed to get orders"
                    );

                }


                const orders =
                    await orderResponse.json();


                let totalRevenue = 0;


                orders.forEach(
                    (order) => {

                        totalRevenue +=
                            Number(
                                order.totalPrice
                            ) || 0;

                    }
                );


                setRevenue(
                    totalRevenue
                );

            } catch (error) {

                console.log(
                    "Order data error:",
                    error
                );

            }


        } catch (error) {

            console.log(
                "Dashboard error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // LOAD DATA
    // =========================================

    useEffect(() => {

        loadDashboardData();


        const interval =
            setInterval(
                loadDashboardData,
                5000
            );


        return () => {

            clearInterval(
                interval
            );

        };

    }, []);


    // =========================================
    // WEATHER
    // =========================================

    const getWeather = async (
        location
    ) => {

        try {

            let searchLocation =
                location.trim();


            // Fix old typo

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
                    "No location found"
                );

            }


            const place =
                geoData.results[0];


            // =================================
            // WEATHER
            // =================================

            const weatherResponse =
                await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m&timezone=auto`
                );


            if (!weatherResponse.ok) {

                throw new Error(
                    "Weather request failed"
                );

            }


            const weatherData =
                await weatherResponse.json();


            const currentTemperature =
                weatherData.current
                    ?.temperature_2m;


            if (
                currentTemperature !== undefined
            ) {

                setTemperature(
                    `${Math.round(
                        currentTemperature
                    )}°C`
                );

            }

        } catch (error) {

            console.log(
                "Weather error:",
                error
            );

            setTemperature(
                "--"
            );

        }

    };


    // =========================================
    // FORMAT REVENUE
    // =========================================

    const formatRevenue = (
        amount
    ) => {

        if (
            !amount ||
            amount <= 0
        ) {

            return "₹0";

        }


        if (
            amount >= 100000
        ) {

            return (
                "₹" +
                (
                    amount / 100000
                ).toFixed(1) +
                "L"
            );

        }


        if (
            amount >= 1000
        ) {

            return (
                "₹" +
                (
                    amount / 1000
                ).toFixed(1) +
                "K"
            );

        }


        return (
            "₹" +
            Math.round(amount)
        );

    };


    // =========================================
    // DASHBOARD CARDS
    // =========================================

    const cards = [

        {
            title: "Total Farms",

            value:
                loading
                    ? "..."
                    : String(
                        totalFarms
                    ).padStart(
                        2,
                        "0"
                    ),

            icon:
                <FaTractor />,

            color:
                "#2E7D32"

        },


        {
            title: "Active Crops",

            value:
                loading
                    ? "..."
                    : String(
                        activeCrops
                    ).padStart(
                        2,
                        "0"
                    ),

            icon:
                <FaSeedling />,

            color:
                "#43A047"

        },


        {
            title: "Revenue",

            value:
                loading
                    ? "..."
                    : formatRevenue(
                        revenue
                    ),

            icon:
                <FaRupeeSign />,

            color:
                "#FB8C00"

        },


        {
            title: "Today's Weather",

            value:
                loading
                    ? "..."
                    : temperature,

            icon:
                <FaCloudSun />,

            color:
                "#039BE5"

        }

    ];


    // =========================================
    // UI
    // =========================================

    return (

        <div className="dashboard-cards">

            {cards.map(
                (
                    card,
                    index
                ) => (

                    <div
                        className="dashboard-card"
                        key={index}
                    >

                        <div
                            className="card-icon"
                            style={{
                                backgroundColor:
                                    card.color
                            }}
                        >

                            {card.icon}

                        </div>


                        <div className="card-content">

                            <h2>
                                {card.value}
                            </h2>


                            <p>
                                {card.title}
                            </p>

                        </div>

                    </div>

                )
            )}

        </div>

    );

}


export default DashboardCards;