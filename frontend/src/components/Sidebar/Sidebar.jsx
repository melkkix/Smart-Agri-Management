import "./Sidebar.css";

import {
    FaTachometerAlt,
    FaTractor,
    FaLeaf,
    FaClipboardList,
    FaCloudSun,
    FaTint,
    FaFlask,
    FaChartLine,
    FaMoneyBillWave,
    FaBell,
    FaExclamationCircle,
    FaCog,
    FaSignOutAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";

import {
    useEffect,
    useState
} from "react";


function Sidebar() {

    const [notificationCount, setNotificationCount] =
        useState(0);


    useEffect(() => {

        getNotificationCount();


        const interval =
            setInterval(() => {

                getNotificationCount();

            }, 2000);


        return () =>
            clearInterval(interval);

    }, []);


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


            const unreadCount =
                data.filter(
                    notification =>
                        notification.read === false
                ).length;


            setNotificationCount(
                unreadCount
            );


        } catch (error) {

            console.log(
                "Notification count error:",
                error
            );

        }

    };


    return (

        <aside className="sidebar">


            <div className="sidebar-logo">

                <h2>
                    🌾 SmartAgri
                </h2>

            </div>


            <ul className="sidebar-menu">


                <li>
                    <Link to="/farmer/dashboard">
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </Link>
                </li>


                <li>
                    <Link to="/farmer/farm-management">
                        <FaTractor />
                        <span>Farm Management</span>
                    </Link>
                </li>


                <li>
                    <Link to="/farmer/crop-management">
                        <FaLeaf />
                        <span>Crop Management</span>
                    </Link>
                </li>


                <li>
                    <Link to="/farmer/orders">
                        <FaClipboardList />
                        <span>Orders</span>
                    </Link>
                </li>


                <li>
                    <Link to="/farmer/weather">
                        <FaCloudSun />
                        <span>Weather</span>
                    </Link>
                </li>


                <li>
                    <Link to="/farmer/irrigation">
                        <FaTint />
                        <span>Irrigation</span>
                    </Link>
                </li>


                <li>
                    <Link to="/farmer/fertilizer">
                        <FaFlask />
                        <span>Fertilizer</span>
                    </Link>
                </li>


                <li>
                    <Link to="/farmer/market-price">
                        <FaChartLine />
                        <span>Market Price</span>
                    </Link>
                </li>


                <li>
                    <Link to="/farmer/finance">
                        <FaMoneyBillWave />
                        <span>Finance</span>
                    </Link>
                </li>


                <li>
                    <Link to="/farmer/reminder">
                        <FaBell />
                        <span>Reminder</span>
                    </Link>
                </li>


                {/* NOTIFICATIONS */}

                <li>

                    <Link to="/farmer/notifications">

                        <FaBell />


                        <span className="notification-menu-text">

                            Notifications


                            {notificationCount > 0 && (

                                <span className="notification-badge">

                                    {notificationCount}

                                </span>

                            )}

                        </span>

                    </Link>

                </li>


                <li>
                    <Link to="/farmer/complaint">
                        <FaExclamationCircle />
                        <span>Complaint</span>
                    </Link>
                </li>


                <li>
                    <Link to="/farmer/settings">
                        <FaCog />
                        <span>Settings</span>
                    </Link>
                </li>


            </ul>


            <div className="sidebar-footer">

                <Link to="/">

                    <FaSignOutAlt />

                    <span>
                        Logout
                    </span>

                </Link>

            </div>


        </aside>

    );
}


export default Sidebar;