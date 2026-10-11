import "./NotificationPanel.css";

import { useEffect, useState } from "react";

import {
    FaBell,
    FaCheckCircle
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";


function NotificationPanel() {

    const [notifications, setNotifications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const navigate =
        useNavigate();


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
                "Invalid user data:",
                error
            );

            return null;
        }
    };


    // =========================================
    // GET NOTIFICATIONS
    // =========================================

    const getNotifications = async () => {

        try {

            const user =
                getLoggedInUser();


            if (
                !user ||
                !user.id ||
                user.role !== "Farmer"
            ) {

                setNotifications([]);

                setLoading(false);

                return;
            }


            const response =
                await fetch(
                    `http://localhost:8080/api/notifications/${user.id}`,
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to get notifications"
                );

            }


            const data =
                await response.json();


            // =====================================
            // SORT
            // =====================================
            //
            // Unread notifications first.
            //

            const sortedNotifications =
                [...data].sort(
                    (a, b) => {

                        const aUnread =
                            a.isRead === false;

                        const bUnread =
                            b.isRead === false;


                        if (
                            aUnread &&
                            !bUnread
                        ) {

                            return -1;

                        }


                        if (
                            !aUnread &&
                            bUnread
                        ) {

                            return 1;

                        }


                        return (
                            Number(b.id || 0) -
                            Number(a.id || 0)
                        );

                    }
                );


            // =====================================
            // SHOW LATEST 4
            // =====================================

            setNotifications(
                sortedNotifications.slice(
                    0,
                    4
                )
            );


        } catch (error) {

            console.log(
                "Error getting notifications:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // LOAD + AUTO REFRESH
    // =========================================

    useEffect(() => {

        getNotifications();


        const interval =
            setInterval(
                getNotifications,
                5000
            );


        return () => {

            clearInterval(interval);

        };

    }, []);


    // =========================================
    // VIEW ALL
    // =========================================

    const handleViewAll = () => {

        navigate(
            "/farmer/notifications"
        );

    };


    // =========================================
    // UI
    // =========================================

    return (

        <div className="notification-panel">


            {/* HEADER */}

            <div className="notification-panel-header">

                <h2>
                    <FaBell />
                    Notifications
                </h2>


                <button
                    onClick={handleViewAll}
                >
                    View All
                </button>

            </div>


            {/* LOADING */}

            {loading ? (

                <div className="notification-empty">

                    Loading notifications...

                </div>


            ) : notifications.length === 0 ? (

                /* NO NOTIFICATIONS */

                <div className="notification-empty">

                    <FaCheckCircle />

                    <p>
                        No notifications.
                    </p>

                </div>


            ) : (

                /* NOTIFICATIONS */

                notifications.map(
                    (item) => {

                        const unread =
                            item.isRead === false;


                        return (

                            <div
                                className={`notification-card ${
                                    unread
                                        ? "unread"
                                        : ""
                                }`}
                                key={item.id}
                            >

                                {/* ICON */}

                                <div className="notification-icon">

                                    <FaBell />

                                </div>


                                {/* CONTENT */}

                                <div className="notification-content">

                                    <div className="notification-title-row">

                                        <h3>
                                            Notification
                                        </h3>


                                        {unread && (

                                            <span className="notification-unread">
                                                Unread
                                            </span>

                                        )}

                                    </div>


                                    <p>
                                        {item.message}
                                    </p>

                                </div>

                            </div>

                        );

                    }
                )

            )}

        </div>

    );
}


export default NotificationPanel;