import "../Sidebar/Sidebar.css";

import {
  FaTachometerAlt,
  FaClipboardList,
  FaBell,
  FaUsers,
  FaLeaf,
  FaExclamationCircle,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminSidebar() {

  const [notificationCount, setNotificationCount] = useState(0);


  useEffect(() => {

    getNotificationCount();

    const interval = setInterval(() => {

      getNotificationCount();

    }, 2000);


    return () => clearInterval(interval);

  }, []);


  const getNotificationCount = async () => {

    try {

      const userData =
        localStorage.getItem("smartAgriUser");


      if (!userData) {
        return;
      }


      const user =
        JSON.parse(userData);


      const response = await fetch(
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


      // ONLY UNREAD NOTIFICATIONS

      const unreadCount =
        data.filter(
          notification =>
            notification.read === false
        ).length;


      setNotificationCount(unreadCount);


    } catch (error) {

      console.log(
        "Admin notification count error:",
        error
      );

    }

  };


  return (

    <aside className="sidebar">


      <div className="sidebar-logo">

        <h2>
          👨‍💼 SmartAgri Admin
        </h2>

      </div>



      <ul className="sidebar-menu">


        <li>

          <Link to="/admin/dashboard">

            <FaTachometerAlt />

            <span>
              Dashboard
            </span>

          </Link>

        </li>



        <li>

          <Link to="/admin/users">

            <FaUsers />

            <span>
              Users
            </span>

          </Link>

        </li>



        <li>

          <Link to="/admin/farmers">

            <FaUsers />

            <span>
              Farmers
            </span>

          </Link>

        </li>



        <li>

          <Link to="/admin/buyers">

            <FaUsers />

            <span>
              Buyers
            </span>

          </Link>

        </li>



        <li>

          <Link to="/admin/crops">

            <FaLeaf />

            <span>
              Crops
            </span>

          </Link>

        </li>



        <li>

          <Link to="/admin/orders">

            <FaClipboardList />

            <span>
              Orders
            </span>

          </Link>

        </li>



        <li>

          <Link to="/admin/complaints">

            <FaExclamationCircle />

            <span>
              Complaints
            </span>

          </Link>

        </li>



        <li>

          <Link to="/admin/reports">

            <FaChartBar />

            <span>
              Reports
            </span>

          </Link>

        </li>



        {/* NOTIFICATIONS */}

        <li>

          <Link to="/admin/notifications">

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


export default AdminSidebar;