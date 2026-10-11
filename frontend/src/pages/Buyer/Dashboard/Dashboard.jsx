import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

import BuyerSidebar from "../../../components/BuyerSidebar/BuyerSidebar";


function Dashboard() {

    const navigate = useNavigate();


    const [products, setProducts] =
        useState([]);


    const [orders, setOrders] =
        useState([]);


    const [notifications, setNotifications] =
        useState([]);


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
    // GET BUYER DASHBOARD DATA
    // =========================================

    const getData = async () => {

        try {

            const user =
                getLoggedInUser();


            if (
                !user ||
                !user.id ||
                user.role !== "Buyer"
            ) {

                setProducts([]);

                setOrders([]);

                setNotifications([]);

                setLoading(false);

                return;

            }


            // =====================================
            // PRODUCTS
            // =====================================

            const productResponse =
                await fetch(
                    "http://localhost:8080/api/products",
                    {
                        cache: "no-store"
                    }
                );


            if (productResponse.ok) {

                const productData =
                    await productResponse.json();


                // Only products that can actually
                // be purchased are counted.

                const availableProducts =
                    productData.filter(
                        (product) => {

                            const quantity =
                                Number(
                                    product.quantity
                                );


                            const status =
                                product.status
                                    ?.toLowerCase();


                            return (
                                quantity > 0 &&
                                status !== "all sold" &&
                                status !== "farm deleted"
                            );

                        }
                    );


                setProducts(
                    availableProducts
                );

            }


            // =====================================
            // ORDERS
            // =====================================

            const orderResponse =
                await fetch(
                    "http://localhost:8080/api/orders",
                    {
                        cache: "no-store"
                    }
                );


            if (orderResponse.ok) {

                const orderData =
                    await orderResponse.json();


                // Only this logged-in buyer's orders.

                const buyerOrders =
                    orderData.filter(
                        (order) => {

                            return (
                                order.buyer &&
                                Number(
                                    order.buyer.id
                                ) ===
                                Number(user.id)
                            );

                        }
                    );


                setOrders(
                    buyerOrders
                );

            }


            // =====================================
            // NOTIFICATIONS
            // =====================================

            const notificationResponse =
                await fetch(
                    `http://localhost:8080/api/notifications/${user.id}`,
                    {
                        cache: "no-store"
                    }
                );


            if (notificationResponse.ok) {

                const notificationData =
                    await notificationResponse.json();


                setNotifications(
                    notificationData
                );

            }

        } catch (error) {

            console.log(
                "Error getting buyer dashboard data:",
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

        getData();


        // Refresh dashboard data every 5 seconds.

        const interval =
            setInterval(
                getData,
                5000
            );


        return () => {

            clearInterval(
                interval
            );

        };

    }, []);


    // =========================================
    // PENDING ORDERS
    // =========================================

    const pendingCount =
        orders.filter(
            (order) =>
                order.status
                    ?.toLowerCase() ===
                "pending"
        ).length;


    // =========================================
    // DELIVERED ORDERS
    // =========================================

    const deliveredCount =
        orders.filter(
            (order) =>
                order.status
                    ?.toLowerCase() ===
                "delivered"
        ).length;


    // =========================================
    // UI
    // =========================================

    return (

        <div className="buyer-dashboard-layout">

            <BuyerSidebar />


            <div className="buyer-dashboard-content">

                <div className="buyer-dashboard">


                    {/* =================================
                        HEADER
                    ================================== */}

                    <div className="buyer-header">

                        <h1>
                            🛒 SmartAgri Marketplace
                        </h1>


                        <p>
                            Explore fresh products and manage your farm orders.
                        </p>

                    </div>


                    {/* =================================
                        SUMMARY CARDS
                    ================================== */}

                    <div className="buyer-summary-grid">


                        {/* PRODUCTS */}

                        <div className="buyer-card">

                            <div className="buyer-card-icon">
                                🛍️
                            </div>


                            <div>

                                <h3>
                                    Products
                                </h3>


                                <h2>

                                    {loading
                                        ? "..."
                                        : products.length
                                    }

                                </h2>


                                <p>
                                    Available products
                                </p>

                            </div>

                        </div>


                        {/* MY ORDERS */}

                        <div className="buyer-card">

                            <div className="buyer-card-icon">
                                📦
                            </div>


                            <div>

                                <h3>
                                    My Orders
                                </h3>


                                <h2>

                                    {loading
                                        ? "..."
                                        : orders.length
                                    }

                                </h2>


                                <p>
                                    Total orders
                                </p>

                            </div>

                        </div>


                        {/* PENDING */}

                        <div className="buyer-card">

                            <div className="buyer-card-icon">
                                ⏳
                            </div>


                            <div>

                                <h3>
                                    Pending
                                </h3>


                                <h2>

                                    {loading
                                        ? "..."
                                        : pendingCount
                                    }

                                </h2>


                                <p>
                                    Orders awaiting processing
                                </p>

                            </div>

                        </div>


                        {/* DELIVERED */}

                        <div className="buyer-card">

                            <div className="buyer-card-icon">
                                🚚
                            </div>


                            <div>

                                <h3>
                                    Delivered
                                </h3>


                                <h2>

                                    {loading
                                        ? "..."
                                        : deliveredCount
                                    }

                                </h2>


                                <p>
                                    Completed orders
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        QUICK ACTIONS
                    ================================== */}

                    <div className="buyer-actions">

                        <h2>
                            🛍️ Quick Actions
                        </h2>


                        <div className="buyer-action-grid">


                            <button
                                onClick={() =>
                                    navigate(
                                        "/buyer/marketplace"
                                    )
                                }
                            >
                                🛒 Browse Marketplace
                            </button>


                            <button
                                onClick={() =>
                                    navigate(
                                        "/buyer/orders"
                                    )
                                }
                            >
                                📦 My Orders
                            </button>


                            <button
                                onClick={() =>
                                    navigate(
                                        "/buyer/notifications"
                                    )
                                }
                            >
                                🔔 Notifications
                            </button>

                        </div>

                    </div>


                    {/* =================================
                        RECENT NOTIFICATIONS
                    ================================== */}

                    <div className="buyer-notification-panel">


                        <div className="buyer-notification-header">

                            <h2>
                                🔔 Recent Notifications
                            </h2>


                            <button
                                onClick={() =>
                                    navigate(
                                        "/buyer/notifications"
                                    )
                                }
                            >
                                View All
                            </button>

                        </div>


                        {loading ? (

                            <p>
                                Loading notifications...
                            </p>

                        ) : notifications.length === 0 ? (

                            <p>
                                No notifications.
                            </p>

                        ) : (

                            notifications
                                .slice(0, 4)
                                .map(
                                    (item) => (

                                        <div
                                            className="buyer-notification"
                                            key={item.id}
                                        >

                                            <span>
                                                🔔
                                            </span>


                                            <p>
                                                {item.message}
                                            </p>

                                        </div>

                                    )
                                )

                        )}

                    </div>

                </div>

            </div>

        </div>

    );

}


export default Dashboard;