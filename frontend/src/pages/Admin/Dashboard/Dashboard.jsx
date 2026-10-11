import { useEffect, useState } from "react";
import "./Dashboard.css";

import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import AdminTopbar from "../../../components/AdminTopbar/AdminTopbar";

function Dashboard() {

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    getUsers();
    getOrders();
    getNotifications();
  }, []);


  const getUsers = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/api/users"
      );

      const data = await response.json();

      setUsers(data);

    } catch (error) {

      console.log(
        "Error getting users:",
        error
      );

    }
  };


  const getOrders = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/api/orders",
        {
          cache: "no-store"
        }
      );

      const data = await response.json();

      setOrders(data);

    } catch (error) {

      console.log(
        "Error getting orders:",
        error
      );

    }
  };


  const getNotifications = async () => {

    try {

      const userData =
        localStorage.getItem("smartAgriUser");

      if (!userData) {
        return;
      }

      const user = JSON.parse(userData);

      if (user.role !== "Admin") {
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/notifications/${user.id}`
      );

      const data = await response.json();

      setNotifications(data);

    } catch (error) {

      console.log(
        "Error getting notifications:",
        error
      );

    }
  };


  const farmerCount =
    users.filter(
      (user) => user.role === "Farmer"
    ).length;


  const buyerCount =
    users.filter(
      (user) => user.role === "Buyer"
    ).length;


  const pendingCount =
    orders.filter(
      (order) => order.status === "Pending"
    ).length;


  const readyCount =
    orders.filter(
      (order) => order.status === "Ready"
    ).length;


  const processingCount =
    orders.filter(
      (order) => order.status === "Processing"
    ).length;


  const deliveredCount =
    orders.filter(
      (order) => order.status === "Delivered"
    ).length;


  return (

    <div className="dashboard-layout">

      <AdminSidebar />

      <div className="dashboard-content">

        <AdminTopbar />


        <div className="admin-dashboard-header">

          <h1>
            👨‍💼 Admin Dashboard
          </h1>

          <p>
            Manage SmartAgri users, orders and operations.
          </p>

        </div>


        {/* Summary Cards */}

        <div className="admin-summary-grid">

          <div className="admin-summary-card">

            <div className="admin-card-icon">
              👥
            </div>

            <div>

              <h3>Users</h3>

              <h2>
                {users.length}
              </h2>

              <p>
                Registered users
              </p>

            </div>

          </div>


          <div className="admin-summary-card">

            <div className="admin-card-icon">
              🌾
            </div>

            <div>

              <h3>Farmers</h3>

              <h2>
                {farmerCount}
              </h2>

              <p>
                Registered farmers
              </p>

            </div>

          </div>


          <div className="admin-summary-card">

            <div className="admin-card-icon">
              🛒
            </div>

            <div>

              <h3>Buyers</h3>

              <h2>
                {buyerCount}
              </h2>

              <p>
                Registered buyers
              </p>

            </div>

          </div>


          <div className="admin-summary-card">

            <div className="admin-card-icon">
              📦
            </div>

            <div>

              <h3>Orders</h3>

              <h2>
                {orders.length}
              </h2>

              <p>
                Total orders
              </p>

            </div>

          </div>

        </div>


        {/* Order Overview */}

        <div className="admin-order-overview">

          <h2>
            📦 Order Overview
          </h2>


          <div className="admin-order-grid">

            <div className="admin-order-box pending">

              <h3>
                ⏳ Pending
              </h3>

              <h2>
                {pendingCount}
              </h2>

              <p>
                Waiting for farmer
              </p>

            </div>


            <div className="admin-order-box ready">

              <h3>
                🟢 Ready
              </h3>

              <h2>
                {readyCount}
              </h2>

              <p>
                Ready for processing
              </p>

            </div>


            <div className="admin-order-box processing">

              <h3>
                🔵 Processing
              </h3>

              <h2>
                {processingCount}
              </h2>

              <p>
                Currently processing
              </p>

            </div>


            <div className="admin-order-box delivered">

              <h3>
                🚚 Delivered
              </h3>

              <h2>
                {deliveredCount}
              </h2>

              <p>
                Completed orders
              </p>

            </div>

          </div>

        </div>


        {/* Notifications */}

        <div className="admin-notification-panel">

          <div className="admin-notification-header">

            <h2>
              🔔 Recent Notifications
            </h2>

            <button
              onClick={() =>
                window.location.href =
                "/admin/notifications"
              }
            >
              View All
            </button>

          </div>


          {notifications.length === 0 ? (

            <p>
              No notifications.
            </p>

          ) : (

            notifications
              .slice(0, 4)
              .map((item) => (

                <div
                  className="admin-notification-card"
                  key={item.id}
                >

                  <div className="admin-notification-icon">
                    🔔
                  </div>

                  <div>

                    <h3>
                      Order Update
                    </h3>

                    <p>
                      {item.message}
                    </p>

                  </div>

                </div>

              ))

          )}

        </div>

      </div>

    </div>

  );
}

export default Dashboard;