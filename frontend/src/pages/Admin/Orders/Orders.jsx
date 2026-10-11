import { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);


    const getOrders = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/orders",
                {
                    cache: "no-store"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to get orders");
            }

            const data = await response.json();

            setOrders(data);

        } catch (error) {

            console.log(
                "Error getting orders:",
                error
            );

        }
    };


    const updateStatus = async (id, status) => {

        try {

            const response = await fetch(
                `http://localhost:8080/api/orders/${id}/status?status=${status}&role=Admin`,
                {
                    method: "PUT"
                }
            );

            if (!response.ok) {

                const message =
                    await response.text();

                alert(
                    message ||
                    "Failed to update order ❌"
                );

                return;
            }

            alert(
                "Order Status Updated ✅"
            );

            getOrders();

        } catch (error) {

            console.log(
                "Error updating order:",
                error
            );

            alert(
                "Backend connection error ❌"
            );
        }
    };


    return (

        <div className="admin-orders-page">

            <h1>
                📦 Order Management
            </h1>

            <p>
                Manage buyer orders and coordinate
                with farmers.
            </p>


            {orders.length === 0 ? (

                <p>
                    No orders available.
                </p>

            ) : (

                <div className="orders-container">

                    {orders.map((order) => (

                        <div
                            className="manager-order-card"
                            key={order.id}
                        >

                            <div className="order-top">

                                <h2>
                                    Order #{order.id}
                                </h2>

                                <span className="order-status">
                                    {order.status}
                                </span>

                            </div>


                            <div className="order-details">

                                <div>
                                    <strong>
                                        Product
                                    </strong>

                                    <p>
                                        {order.product.productName}
                                    </p>
                                </div>


                                <div>
                                    <strong>
                                        Category
                                    </strong>

                                    <p>
                                        {order.product.category}
                                    </p>
                                </div>


                                <div>
                                    <strong>
                                        Quantity
                                    </strong>

                                    <p>
                                        {order.quantity}{" "}
                                        {order.product.unit}
                                    </p>
                                </div>


                                <div>
                                    <strong>
                                        Amount
                                    </strong>

                                    <p>
                                        ₹{order.totalPrice}
                                    </p>
                                </div>

                            </div>


                            <div className="farm-details">

                                <h3>
                                    🌾 Farmer Supply Details
                                </h3>


                                <p>
                                    <strong>
                                        Farm:
                                    </strong>{" "}
                                    {order.product.farm.farmName}
                                </p>


                                <p>
                                    <strong>
                                        Location:
                                    </strong>{" "}
                                    {order.product.farm.location}
                                </p>


                                <p>
                                    <strong>
                                        Crop:
                                    </strong>{" "}
                                    {order.product.farm.cropType}
                                </p>

                            </div>


                            <div className="manager-action">

                                <label>
                                    Order Status
                                </label>


                                {order.status === "Pending" && (

                                    <p>
                                        ⏳ Waiting for farmer
                                        to mark product as Ready.
                                    </p>

                                )}


                                {order.status === "Ready" && (

                                    <button
                                        className="status-btn"
                                        onClick={() =>
                                            updateStatus(
                                                order.id,
                                                "Processing"
                                            )
                                        }
                                    >
                                        🚚 Start Processing
                                    </button>

                                )}


                                {order.status === "Processing" && (

                                    <button
                                        className="status-btn"
                                        onClick={() =>
                                            updateStatus(
                                                order.id,
                                                "Delivered"
                                            )
                                        }
                                    >
                                        📦 Mark as Delivered
                                    </button>

                                )}


                                {order.status === "Delivered" && (

                                    <p>
                                        ✅ Order Completed
                                    </p>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default Orders;