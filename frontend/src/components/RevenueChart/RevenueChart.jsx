import { useEffect, useState } from "react";
import "./RevenueChart.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

import { Line } from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);


function RevenueChart() {

    const [monthlyRevenue, setMonthlyRevenue] =
        useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    const [loading, setLoading] =
        useState(true);


    // =========================================
    // GET LOGGED-IN FARMER
    // =========================================

    const getUser = () => {

        const userData =
            localStorage.getItem("smartAgriUser");

        if (!userData) {
            return null;
        }

        try {
            return JSON.parse(userData);
        } catch (error) {
            console.log("Invalid user:", error);
            return null;
        }
    };


    // =========================================
    // GET MONTH INDEX
    // =========================================

    const getOrderDate = (order) => {

        /*
         * We support the common date fields.
         * If your Order entity has one of these,
         * it will automatically be used.
         */

        const dateValue =
            order.createdAt ||
            order.orderDate ||
            order.date;

        if (!dateValue) {
            return null;
        }

        const date =
            new Date(dateValue);

        if (isNaN(date.getTime())) {
            return null;
        }

        return date;
    };


    // =========================================
    // LOAD REVENUE
    // =========================================

    const loadRevenue = async () => {

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
                    `http://localhost:8080/api/orders?farmerId=${user.id}`,
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to get farmer orders"
                );

            }


            const orders =
                await response.json();


            // =================================
            // CURRENT YEAR
            // =================================

            const currentYear =
                new Date().getFullYear();


            const revenue =
                Array(12).fill(0);


            // =================================
            // CALCULATE MONTHLY REVENUE
            // =================================

            orders.forEach((order) => {

                const orderDate =
                    getOrderDate(order);


                /*
                 * If the backend has a date,
                 * put the revenue in that month.
                 */

                if (
                    orderDate &&
                    orderDate.getFullYear() === currentYear
                ) {

                    const month =
                        orderDate.getMonth();


                    revenue[month] +=
                        Number(
                            order.totalPrice
                        ) || 0;

                }

            });


            setMonthlyRevenue(
                revenue
            );


        } catch (error) {

            console.log(
                "Revenue chart error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // LOAD + REFRESH
    // =========================================

    useEffect(() => {

        loadRevenue();


        const interval =
            setInterval(
                loadRevenue,
                5000
            );


        return () => {

            clearInterval(
                interval
            );

        };

    }, []);


    // =========================================
    // MONTH NAMES
    // =========================================

    const labels = [

        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"

    ];


    // =========================================
    // CHART DATA
    // =========================================

    const data = {

        labels: labels,

        datasets: [

            {
                label: "Revenue",

                data: monthlyRevenue,

                borderColor: "#2E7D32",

                backgroundColor:
                    "rgba(46,125,50,0.15)",

                tension: 0.4,

                fill: true,

                pointRadius: 4,

                pointHoverRadius: 6

            }

        ]

    };


    // =========================================
    // CHART OPTIONS
    // =========================================

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: "top"

            },

            tooltip: {

                callbacks: {

                    label: function(context) {

                        return (
                            " Revenue: ₹" +
                            Number(
                                context.raw || 0
                            ).toLocaleString("en-IN")
                        );

                    }

                }

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                ticks: {

                    callback: function(value) {

                        return (
                            "₹" +
                            Number(
                                value
                            ).toLocaleString("en-IN")
                        );

                    }

                }

            }

        }

    };


    return (

        <div className="chart-container">

            <h2>
                Revenue Overview
            </h2>


            {loading ? (

                <div className="chart-loading">
                    Loading revenue...
                </div>

            ) : (

                <div className="revenue-chart-wrapper">

                    <Line
                        data={data}
                        options={options}
                    />

                </div>

            )}

        </div>

    );

}


export default RevenueChart;