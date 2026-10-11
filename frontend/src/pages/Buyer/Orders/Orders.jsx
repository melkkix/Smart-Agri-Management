import { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        getOrders();

        // Refresh order status every 5 seconds
        const interval = setInterval(() => {
            getOrders();
        }, 5000);

        return () => clearInterval(interval);

    }, []);


    const getOrders = async () => {

        try {

            const userData =
                localStorage.getItem("smartAgriUser");

            if (!userData) {

                alert("Please login first.");

                return;
            }


            const user = JSON.parse(userData);


            if (user.role !== "Buyer") {

                alert("Only buyers can access this page.");

                return;
            }


            const response = await fetch(
                "http://localhost:8080/api/orders",
                {
                    cache: "no-store"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to get orders"
                );

            }


            const data = await response.json();


            // Get only this buyer's orders
            const buyerOrders =
                data.filter(
                    (order) =>
                        order.buyer &&
                        order.buyer.id === user.id
                );


            setOrders(buyerOrders);


        } catch (error) {

            console.log(
                "Error getting buyer orders:",
                error
            );

        }

    };


    // Get tracking step
    const getStep = (status) => {

        if (status === "Pending") {
            return 1;
        }

        if (status === "Processing") {
            return 2;
        }

        if (status === "Ready") {
            return 3;
        }

        if (status === "Delivered") {
            return 4;
        }

        return 1;

    };


    // Status message
    const getStatusMessage = (status) => {

        if (status === "Pending") {

            return "⏳ Waiting for farmer confirmation.";

        }

        if (status === "Processing") {

            return "🔵 Your order is being processed.";

        }

        if (status === "Ready") {

            return "🟢 Farmer has prepared your order.";

        }

        if (status === "Delivered") {

            return "🚚 Your order has been delivered.";

        }

        return "";

    };


    return (

        <div className="orders-page">

            <div className="orders-header">

                <h1>
                    📦 My Orders
                </h1>

                <p>
                    View and track the orders you placed
                    from SmartAgri Marketplace.
                </p>

            </div>


            {orders.length === 0 ? (

                <div className="no-orders">

                    <h2>
                        📦 No Orders Found
                    </h2>

                    <p>
                        You have not placed any orders yet.
                    </p>

                </div>

            ) : (

                <div className="orders-list">

                    {orders.map((order) => {

                        const currentStep =
                            getStep(order.status);


                        return (

                            <div
                                className="order-card"
                                key={order.id}
                            >

                                {/* ORDER HEADER */}

                                <div className="order-header">

                                    <h2>
                                        Order #{order.id}
                                    </h2>

                                    <span
                                        className={
                                            `order-status ${
                                                order.status
                                                    ?.toLowerCase()
                                            }`
                                        }
                                    >
                                        {order.status}
                                    </span>

                                </div>


                                {/* PRODUCT DETAILS */}

                                <div className="product-info">

                                    <h3>
                                        🌾 Product Details
                                    </h3>

                                    <p>
                                        <strong>
                                            Product:
                                        </strong>{" "}
                                        {order.product?.productName}
                                    </p>


                                    <p>
                                        <strong>
                                            Category:
                                        </strong>{" "}
                                        {order.product?.category}
                                    </p>


                                    <p>
                                        <strong>
                                            Quantity:
                                        </strong>{" "}
                                        {order.quantity}{" "}
                                        {order.product?.unit}
                                    </p>


                                    <p>
                                        <strong>
                                            Location:
                                        </strong>{" "}
                                        {order.product?.location}
                                    </p>


                                    <p>
                                        <strong>
                                            Farm:
                                        </strong>{" "}
                                        {order.product?.farm?.farmName}
                                    </p>


                                    <h3 className="order-price">
                                        ₹{order.totalPrice}
                                    </h3>

                                </div>


                                {/* STATUS MESSAGE */}

                                <div className="status-message">

                                    {getStatusMessage(
                                        order.status
                                    )}

                                </div>


                                {/* TRACKING */}

                                <div className="tracking-section">

                                    <h3>
                                        🚚 Order Tracking
                                    </h3>


                                    <div className="tracking">

                                        {/* LINE */}

                                        <div className="tracking-line">

                                            <div
                                                className="tracking-progress"
                                                style={{
                                                    width:
                                                        `${((currentStep - 1) / 3) * 100}%`
                                                }}
                                            >
                                            </div>

                                        </div>


                                        {/* STEP 1 */}

                                        <div
                                            className={
                                                `step ${
                                                    currentStep >= 1
                                                        ? "active"
                                                        : ""
                                                }`
                                            }
                                        >

                                            <span>
                                                {currentStep > 1
                                                    ? "✓"
                                                    : "1"}
                                            </span>

                                            <p>
                                                Pending
                                            </p>

                                        </div>


                                        {/* STEP 2 */}

                                        <div
                                            className={
                                                `step ${
                                                    currentStep >= 2
                                                        ? "active"
                                                        : ""
                                                }`
                                            }
                                        >

                                            <span>
                                                {currentStep > 2
                                                    ? "✓"
                                                    : "2"}
                                            </span>

                                            <p>
                                                Processing
                                            </p>

                                        </div>


                                        {/* STEP 3 */}

                                        <div
                                            className={
                                                `step ${
                                                    currentStep >= 3
                                                        ? "active"
                                                        : ""
                                                }`
                                            }
                                        >

                                            <span>
                                                {currentStep > 3
                                                    ? "✓"
                                                    : "3"}
                                            </span>

                                            <p>
                                                Ready
                                            </p>

                                        </div>


                                        {/* STEP 4 */}

                                        <div
                                            className={
                                                `step ${
                                                    currentStep >= 4
                                                        ? "active"
                                                        : ""
                                                }`
                                            }
                                        >

                                            <span>
                                                {currentStep >= 4
                                                    ? "✓"
                                                    : "4"}
                                            </span>

                                            <p>
                                                Delivered
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>

    );

}

export default Orders;