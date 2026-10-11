import { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
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

            if (user.role !== "Farmer") {
                alert("Only farmers can access this page.");
                return;
            }

            const response = await fetch(
                `http://localhost:8080/api/orders?farmerId=${user.id}`
            );

            if (!response.ok) {
                throw new Error("Failed to get orders");
            }

            const data = await response.json();

            setOrders(data);

        } catch (error) {

            console.log(
                "Error getting farmer orders:",
                error
            );

        }
    };


    const markAsReady = async (id) => {

        try {

            const response = await fetch(
                `http://localhost:8080/api/orders/${id}/status?status=Ready&role=Farmer`,
                {
                    method: "PUT"
                }
            );

            if (!response.ok) {

                const message = await response.text();

                alert(
                    message || "Failed to update order ❌"
                );

                return;
            }

            alert("Product marked as Ready ✅");

            getOrders();

        } catch (error) {

            console.log(
                "Error updating order:",
                error
            );

            alert("Backend connection error ❌");
        }
    };


    return (

        <div className="orders-page">

            <h1>📦 My Farm Orders</h1>

            <p>
                View orders received for your farm.
            </p>


            {orders.length === 0 ? (

                <p>
                    No orders found for your farm.
                </p>

            ) : (

                <div className="orders-list">

                    {orders.map((order) => (

                        <div
                            className="order-card"
                            key={order.id}
                        >

                            <div className="order-header">

                                <h2>
                                    Order #{order.id}
                                </h2>

                                <span className="order-status">
                                    {order.status}
                                </span>

                            </div>


                            <p>
                                <strong>Product:</strong>{" "}
                                {order.product.productName}
                            </p>


                            <p>
                                <strong>Category:</strong>{" "}
                                {order.product.category}
                            </p>


                            <p>
                                <strong>Quantity:</strong>{" "}
                                {order.quantity}{" "}
                                {order.product.unit}
                            </p>


                            <p>
                                <strong>Location:</strong>{" "}
                                {order.product.location}
                            </p>


                            <p>
                                <strong>Farm:</strong>{" "}
                                {order.product.farm.farmName}
                            </p>


                            <h3>
                                ₹{order.totalPrice}
                            </h3>


                            {order.status === "Pending" && (

                                <button
                                    className="ready-btn"
                                    onClick={() =>
                                        markAsReady(order.id)
                                    }
                                >
                                    ✅ Mark as Ready
                                </button>

                            )}


                            {order.status === "Ready" && (

                                <p>
                                    🟢 Product is Ready.
                                    Waiting for Admin.
                                </p>

                            )}


                            {order.status === "Processing" && (

                                <p>
                                    🔵 Admin is processing
                                    this order.
                                </p>

                            )}


                            {order.status === "Delivered" && (

                                <p>
                                    🚚 Order Delivered.
                                </p>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default Orders;