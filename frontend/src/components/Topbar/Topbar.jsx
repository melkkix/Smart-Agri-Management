import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Topbar.css";

import {
    FaBell,
    FaSearch,
    FaUserCircle
} from "react-icons/fa";


function Topbar() {

    const navigate = useNavigate();


    const [user, setUser] =
        useState(null);


    const [notificationCount, setNotificationCount] =
        useState(0);


    const [searchText, setSearchText] =
        useState("");


    // =========================================
    // DATE
    // =========================================

    const today =
        new Date().toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    // =========================================
    // LOAD USER
    // =========================================

    useEffect(() => {

        const loadUser = () => {

            const userData =
                localStorage.getItem(
                    "smartAgriUser"
                );


            if (!userData) {

                setUser(null);

                return;

            }


            try {

                const loggedUser =
                    JSON.parse(
                        userData
                    );


                setUser(
                    loggedUser
                );

            } catch (error) {

                console.log(
                    "Error loading user:",
                    error
                );

                setUser(null);

            }

        };


        loadUser();


        // Check if user data changes
        // while dashboard is open.

        const interval =
            setInterval(
                loadUser,
                2000
            );


        return () => {

            clearInterval(
                interval
            );

        };

    }, []);


    // =========================================
    // GET NOTIFICATIONS
    // =========================================

    useEffect(() => {

        if (
            !user?.id ||
            user?.role !== "Farmer"
        ) {

            setNotificationCount(0);

            return;

        }


        const getNotifications =
            async () => {

                try {

                    const response =
                        await fetch(
                            `http://localhost:8080/api/notifications/${user.id}`,
                            {
                                cache: "no-store"
                            }
                        );


                    if (!response.ok) {

                        return;

                    }


                    const data =
                        await response.json();


                    // =================================
                    // COUNT ONLY UNREAD
                    // =================================

                    const unread =
                        data.filter(
                            (notification) =>
                                notification.isRead === false
                        ).length;


                    setNotificationCount(
                        unread
                    );


                } catch (error) {

                    console.log(
                        "Error getting notifications:",
                        error
                    );

                }

            };


        getNotifications();


        const interval =
            setInterval(
                getNotifications,
                2000
            );


        return () => {

            clearInterval(
                interval
            );

        };

    }, [user]);


    // =========================================
    // USER NAME
    // =========================================

    const farmerName =
        user?.name || "Farmer";


    // =========================================
    // USER PHOTO
    // =========================================

    const farmerPhoto =
        user?.profileImage ||
        user?.photo ||
        user?.image ||
        user?.profilePhoto ||
        null;


    // =========================================
    // NOTIFICATION CLICK
    // =========================================

    const openNotifications = () => {

        navigate(
            "/farmer/notifications"
        );

    };


    // =========================================
    // SEARCH TEXT
    // =========================================

    const handleSearch = (event) => {

        setSearchText(
            event.target.value
        );

    };


    // =========================================
    // SEARCH NAVIGATION
    // =========================================

    const handleSearchSubmit = (event) => {

        if (
            event.key !== "Enter"
        ) {

            return;

        }


        const search =
            searchText
                .trim()
                .toLowerCase();


        if (!search) {

            return;

        }


        // =====================================
        // FARM
        // =====================================

        if (
            search.includes("farm")
        ) {

            navigate(
                "/farmer/farm-management"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // CROP / PRODUCT
        // =====================================

        if (
            search.includes("crop") ||
            search.includes("product")
        ) {

            navigate(
                "/farmer/crop-management"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // WEATHER
        // =====================================

        if (
            search.includes("weather")
        ) {

            navigate(
                "/farmer/weather"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // ORDER
        // =====================================

        if (
            search.includes("order")
        ) {

            navigate(
                "/farmer/orders"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // NOTIFICATION
        // =====================================

        if (
            search.includes("notification")
        ) {

            navigate(
                "/farmer/notifications"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // IRRIGATION
        // =====================================

        if (
            search.includes("irrigation") ||
            search.includes("water")
        ) {

            navigate(
                "/farmer/irrigation"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // FERTILIZER
        // =====================================

        if (
            search.includes("fertilizer")
        ) {

            navigate(
                "/farmer/fertilizer"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // MARKET PRICE
        // =====================================

        if (
            search.includes("market") ||
            search.includes("price")
        ) {

            navigate(
                "/farmer/market-price"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // FINANCE
        // =====================================

        if (
            search.includes("finance") ||
            search.includes("financial")
        ) {

            navigate(
                "/farmer/finance"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // REMINDER / CALENDAR
        // =====================================

        if (
            search.includes("reminder") ||
            search.includes("calendar")
        ) {

            navigate(
                "/farmer/reminder"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // SETTINGS
        // =====================================

        if (
            search.includes("setting")
        ) {

            navigate(
                "/farmer/settings"
            );

            setSearchText("");

            return;

        }


        // =====================================
        // NO MATCH
        // =====================================

        alert(
            `No page found for "${searchText}".`
        );

    };


    // =========================================
    // UI
    // =========================================

    return (

        <div className="topbar">


            {/* =====================================
                LEFT
            ====================================== */}

            <div className="topbar-left">

                <h2>
                    👋 Welcome Back, {farmerName}!
                </h2>


                <p>
                    {today}
                </p>

            </div>


            {/* =====================================
                SEARCH
            ====================================== */}

            <div className="topbar-center">

                <div className="search-box">

                    <FaSearch
                        className="search-icon"
                    />


                    <input
                        type="text"
                        value={searchText}
                        onChange={
                            handleSearch
                        }
                        onKeyDown={
                            handleSearchSubmit
                        }
                        placeholder="Search farms, crops, weather..."
                        aria-label="Search dashboard"
                    />

                </div>

            </div>


            {/* =====================================
                RIGHT
            ====================================== */}

            <div className="topbar-right">


                {/* =================================
                    NOTIFICATIONS
                ================================== */}

                <button
                    type="button"
                    className="icon-btn notification-btn"
                    onClick={
                        openNotifications
                    }
                    title="Notifications"
                >

                    <FaBell />


                    {notificationCount > 0 && (

                        <span className="notification-count">

                            {notificationCount > 99
                                ? "99+"
                                : notificationCount}

                        </span>

                    )}

                </button>


                {/* =================================
                    PROFILE
                ================================== */}

                <div className="profile">


                    {/* PHOTO */}

                    {farmerPhoto ? (

                        <img
                            src={farmerPhoto}
                            alt={`${farmerName} profile`}
                            className="profile-image"
                        />

                    ) : (

                        <div className="profile-placeholder">

                            <FaUserCircle />

                        </div>

                    )}


                    {/* USER INFORMATION */}

                    <div className="profile-info">

                        <h4>
                            {farmerName}
                        </h4>


                        <p>
                            {user?.role || "Farmer"}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default Topbar;