import { useEffect, useState } from "react";
import "./Dashboard.css";

import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import DashboardCards from "../../../components/DashboardCards/DashboardCards";
import RevenueChart from "../../../components/RevenueChart/RevenueChart";
import WeatherWidget from "../../../components/WeatherWidget/WeatherWidget";
import CropOverview from "../../../components/CropOverview/CropOverview";
import RecentActivities from "../../../components/RecentActivities/RecentActivities";
import NotificationPanel from "../../../components/NotificationPanel/NotificationPanel";
import CalendarReminder from "../../../components/CalendarReminder/CalendarReminder";


function Dashboard() {

    const [orderCount, setOrderCount] =
        useState(0);

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
    // GET FARMER ORDERS
    // =========================================

    const getOrders = async () => {

        try {

            const user =
                getLoggedInUser();


            // ---------------------------------
            // CHECK LOGIN
            // ---------------------------------

            if (
                !user ||
                !user.id ||
                user.role !== "Farmer"
            ) {

                setOrderCount(0);

                setLoading(false);

                return;

            }


            // ---------------------------------
            // GET ONLY THIS FARMER'S ORDERS
            // ---------------------------------

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


            const data =
                await response.json();


            // ---------------------------------
            // UPDATE ORDER COUNT
            // ---------------------------------

            setOrderCount(
                data.length
            );


        } catch (error) {

            console.log(
                "Error getting farmer orders:",
                error
            );

            setOrderCount(0);

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // LOAD ORDERS
    // =========================================

    useEffect(() => {

        getOrders();


        // Refresh every 5 seconds
        // so new buyer orders appear

        const interval =
            setInterval(
                getOrders,
                5000
            );


        return () => {

            clearInterval(
                interval
            );

        };

    }, []);


    // =========================================
    // UI
    // =========================================

    return (

        <div className="dashboard-layout">

            <Sidebar />


            <div className="dashboard-content">

                <Topbar />


                {/* ================================= */}
                {/* DASHBOARD CARDS */}
                {/* ================================= */}

                <DashboardCards />


                {/* ================================= */}
                {/* ORDERS SUMMARY */}
                {/* ================================= */}

                <div className="dashboard-order-card">

                    <div className="order-card-icon">
                        📦
                    </div>


                    <div>

                        <h3>
                            Total Orders
                        </h3>


                        <h2>

                            {loading
                                ? "..."
                                : orderCount
                            }

                        </h2>


                        <p>
                            Orders received for farm products
                        </p>

                    </div>

                </div>


                {/* ================================= */}
                {/* REVENUE + WEATHER */}
                {/* ================================= */}

                <div className="dashboard-grid">

                    <RevenueChart />

                    <WeatherWidget />

                </div>


                {/* ================================= */}
                {/* CROP OVERVIEW */}
                {/* ================================= */}

                <CropOverview />


                {/* ================================= */}
                {/* ACTIVITIES + NOTIFICATIONS */}
                {/* ================================= */}

                <div className="dashboard-grid">

                    <RecentActivities />

                    <NotificationPanel />

                </div>


                {/* ================================= */}
                {/* REAL CALENDAR */}
                {/* ================================= */}

                <CalendarReminder />

            </div>

        </div>

    );

}


export default Dashboard;