import "./BuyerSidebar.css";

import {
    FaTachometerAlt,
    FaShoppingCart,
    FaClipboardList,
    FaBell,
    FaExclamationCircle,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";


function BuyerSidebar() {

    const [notificationCount, setNotificationCount] =
        useState(0);

    const navigate =
        useNavigate();


    // =========================================
    // GET NOTIFICATION COUNT
    // =========================================

    const getNotificationCount = async () => {

        try {

            const userData =
                localStorage.getItem(
                    "smartAgriUser"
                );


            if (!userData) {

                setNotificationCount(0);

                return;

            }


            const user =
                JSON.parse(userData);


            if (
                !user.id ||
                user.role !== "Buyer"
            ) {

                setNotificationCount(0);

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

                return;

            }


            const data =
                await response.json();


            // =====================================
            // COUNT ONLY UNREAD
            // =====================================

            const unreadCount =
                data.filter(
                    (notification) =>
                        notification.isRead === false
                ).length;


            setNotificationCount(
                unreadCount
            );


        } catch (error) {

            console.log(
                "Buyer notification count error:",
                error
            );

        }

    };


    // =========================================
    // LOAD + AUTO REFRESH
    // =========================================

    useEffect(() => {

        getNotificationCount();


        const interval =
            setInterval(
                getNotificationCount,
                2000
            );


        // =====================================
        // REFRESH AFTER NOTIFICATIONS READ
        // =====================================

        const handleNotificationsRead = () => {

            getNotificationCount();

        };


        window.addEventListener(
            "notificationsRead",
            handleNotificationsRead
        );


        return () => {

            clearInterval(interval);


            window.removeEventListener(
                "notificationsRead",
                handleNotificationsRead
            );

        };

    }, []);


    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = () => {

        localStorage.removeItem(
            "smartAgriUser"
        );


        navigate("/");

    };


    // =========================================
    // UI
    // =========================================

    return (

        <aside className="buyer-sidebar">


            {/* =================================
                LOGO
            ================================== */}

            <div className="buyer-sidebar-logo">

                <h2>
                    🛒 SmartAgri
                </h2>


                <p>
                    Marketplace
                </p>

            </div>


            {/* =================================
                MENU
            ================================== */}

            <ul className="buyer-sidebar-menu">


                {/* DASHBOARD */}

                <li>

                    <Link to="/buyer/dashboard">

                        <FaTachometerAlt />

                        <span>
                            Dashboard
                        </span>

                    </Link>

                </li>


                {/* MARKETPLACE */}

                <li>

                    <Link to="/buyer/marketplace">

                        <FaShoppingCart />

                        <span>
                            Marketplace
                        </span>

                    </Link>

                </li>


                {/* MY ORDERS */}

                <li>

                    <Link to="/buyer/orders">

                        <FaClipboardList />

                        <span>
                            My Orders
                        </span>

                    </Link>

                </li>


                {/* NOTIFICATIONS */}

                <li>

                    <Link to="/buyer/notifications">

                        <FaBell />

                        <span className="buyer-notification-text">

                            Notifications


                            {notificationCount > 0 && (

                                <span className="buyer-notification-badge">

                                    {notificationCount > 99
                                        ? "99+"
                                        : notificationCount}

                                </span>

                            )}

                        </span>

                    </Link>

                </li>


                {/* COMPLAINT */}

                <li>

                    <Link to="/buyer/complaint">

                        <FaExclamationCircle />

                        <span>
                            Complaint
                        </span>

                    </Link>

                </li>


                {/* SETTINGS */}

                <li>

                    <Link to="/buyer/settings">

                        <FaCog />

                        <span>
                            Settings
                        </span>

                    </Link>

                </li>

            </ul>


            {/* =================================
                LOGOUT
            ================================== */}

            <div className="buyer-sidebar-footer">

                <button
                    type="button"
                    onClick={handleLogout}
                    className="buyer-logout-button"
                >

                    <FaSignOutAlt />

                    <span>
                        Logout
                    </span>

                </button>

            </div>


        </aside>

    );

}


export default BuyerSidebar;