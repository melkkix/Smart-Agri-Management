import { useEffect, useState } from "react";
import "./Reports.css";

function Reports() {

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        getReportData();
    }, []);


    const getReportData = async () => {

        try {

            const usersResponse = await fetch(
                "http://localhost:8080/api/users"
            );

            const productsResponse = await fetch(
                "http://localhost:8080/api/products"
            );

            const ordersResponse = await fetch(
                "http://localhost:8080/api/orders",
                {
                    cache: "no-store"
                }
            );

            const complaintsResponse = await fetch(
                "http://localhost:8080/api/complaints",
                {
                    cache: "no-store"
                }
            );


            if (
                !usersResponse.ok ||
                !productsResponse.ok ||
                !ordersResponse.ok ||
                !complaintsResponse.ok
            ) {
                throw new Error(
                    "Failed to get report data"
                );
            }


            const usersData =
                await usersResponse.json();

            const productsData =
                await productsResponse.json();

            const ordersData =
                await ordersResponse.json();

            const complaintsData =
                await complaintsResponse.json();


            setUsers(usersData);
            setProducts(productsData);
            setOrders(ordersData);
            setComplaints(complaintsData);


        } catch (error) {

            console.log(
                "Error getting report data:",
                error
            );

        }

    };


    const farmers = users.filter(
        (user) => user.role === "Farmer"
    );

    const buyers = users.filter(
        (user) => user.role === "Buyer"
    );

    const pendingOrders = orders.filter(
        (order) => order.status === "Pending"
    );

    const deliveredOrders = orders.filter(
        (order) => order.status === "Delivered"
    );

    const totalSales = deliveredOrders.reduce(
        (total, order) =>
            total + Number(order.totalPrice || 0),
        0
    );


    return (

        <div className="admin-reports-page">

            <div className="reports-header">

                <h1>
                    📊 Admin Reports
                </h1>

                <p>
                    Overview of SmartAgri platform activity.
                </p>

            </div>


            <div className="reports-grid">

                <div className="report-card">

                    <div className="report-icon">
                        👥
                    </div>

                    <div>
                        <h3>Total Users</h3>
                        <h2>{users.length}</h2>
                    </div>

                </div>


                <div className="report-card">

                    <div className="report-icon">
                        🌾
                    </div>

                    <div>
                        <h3>Farmers</h3>
                        <h2>{farmers.length}</h2>
                    </div>

                </div>


                <div className="report-card">

                    <div className="report-icon">
                        🛒
                    </div>

                    <div>
                        <h3>Buyers</h3>
                        <h2>{buyers.length}</h2>
                    </div>

                </div>


                <div className="report-card">

                    <div className="report-icon">
                        🌱
                    </div>

                    <div>
                        <h3>Total Products</h3>
                        <h2>{products.length}</h2>
                    </div>

                </div>


                <div className="report-card">

                    <div className="report-icon">
                        📦
                    </div>

                    <div>
                        <h3>Total Orders</h3>
                        <h2>{orders.length}</h2>
                    </div>

                </div>


                <div className="report-card">

                    <div className="report-icon">
                        ⏳
                    </div>

                    <div>
                        <h3>Pending Orders</h3>
                        <h2>{pendingOrders.length}</h2>
                    </div>

                </div>


                <div className="report-card">

                    <div className="report-icon">
                        🚚
                    </div>

                    <div>
                        <h3>Delivered Orders</h3>
                        <h2>{deliveredOrders.length}</h2>
                    </div>

                </div>


                <div className="report-card">

                    <div className="report-icon">
                        ⚠️
                    </div>

                    <div>
                        <h3>Complaints</h3>
                        <h2>{complaints.length}</h2>
                    </div>

                </div>

            </div>


            <div className="sales-card">

                <h2>
                    💰 Completed Sales
                </h2>

                <h1>
                    ₹{totalSales.toFixed(2)}
                </h1>

                <p>
                    Total value of delivered orders
                </p>

            </div>

        </div>

    );

}

export default Reports;