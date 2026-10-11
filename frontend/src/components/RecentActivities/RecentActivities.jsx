import { useEffect, useState } from "react";

import "./RecentActivities.css";

import {
    FaSeedling,
    FaTint,
    FaTractor,
    FaShoppingBasket,
    FaBox
} from "react-icons/fa";


function RecentActivities() {

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);


    // =========================================
    // GET LOGGED-IN USER
    // =========================================

    const getLoggedInUser = () => {

        const userData =
            localStorage.getItem("smartAgriUser");

        if (!userData) {
            return null;
        }

        try {

            return JSON.parse(userData);

        } catch (error) {

            console.log(
                "Invalid user data:",
                error
            );

            return null;
        }
    };


    // =========================================
    // FORMAT TIME
    // =========================================

    const formatTime = (dateValue) => {

        if (!dateValue) {
            return "Recently";
        }

        const date = new Date(dateValue);

        if (isNaN(date.getTime())) {
            return "Recently";
        }

        const now = new Date();

        const difference =
            now.getTime() - date.getTime();

        const minutes =
            Math.floor(
                difference / (1000 * 60)
            );

        const hours =
            Math.floor(
                difference / (1000 * 60 * 60)
            );

        const days =
            Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );


        if (minutes < 1) {
            return "Just now";
        }


        if (minutes < 60) {

            return `${minutes} minute${
                minutes === 1 ? "" : "s"
            } ago`;

        }


        if (hours < 24) {

            return `${hours} hour${
                hours === 1 ? "" : "s"
            } ago`;

        }


        if (days === 1) {
            return "Yesterday";
        }


        if (days < 7) {

            return `${days} days ago`;

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };


    // =========================================
    // GET DATE
    // =========================================

    const getDate = (item) => {

        if (!item) {
            return null;
        }

        return (
            item.createdAt ||
            item.createdDate ||
            item.orderDate ||
            item.updatedAt ||
            item.updatedDate ||
            item.irrigationDate ||
            item.date ||
            null
        );
    };


    // =========================================
    // LOAD ACTIVITIES
    // =========================================

    const loadActivities = async () => {

        try {

            const user =
                getLoggedInUser();


            if (
                !user ||
                !user.id ||
                user.role !== "Farmer"
            ) {

                setActivities([]);
                setLoading(false);

                return;
            }


            const farmerId = user.id;


            // =====================================
            // FETCH FARMS
            // =====================================

            let farms = [];

            try {

                const response =
                    await fetch(
                        `http://localhost:8080/api/farms?farmerId=${farmerId}`,
                        {
                            cache: "no-store"
                        }
                    );


                if (response.ok) {

                    farms =
                        await response.json();

                }

            } catch (error) {

                console.log(
                    "Farm fetch error:",
                    error
                );
            }


            // =====================================
            // FETCH PRODUCTS
            // =====================================

            let products = [];

            try {

                const response =
                    await fetch(
                        `http://localhost:8080/api/products?farmerId=${farmerId}`,
                        {
                            cache: "no-store"
                        }
                    );


                if (response.ok) {

                    products =
                        await response.json();

                }

            } catch (error) {

                console.log(
                    "Product fetch error:",
                    error
                );
            }


            // =====================================
            // FETCH ORDERS
            // =====================================

            let orders = [];

            try {

                const response =
                    await fetch(
                        `http://localhost:8080/api/orders?farmerId=${farmerId}`,
                        {
                            cache: "no-store"
                        }
                    );


                if (response.ok) {

                    orders =
                        await response.json();

                }

            } catch (error) {

                console.log(
                    "Order fetch error:",
                    error
                );
            }


            // =====================================
            // FETCH IRRIGATION
            // =====================================

            let irrigations = [];

            try {

                const response =
                    await fetch(
                        "http://localhost:8080/api/irrigations",
                        {
                            cache: "no-store"
                        }
                    );


                if (response.ok) {

                    const irrigationData =
                        await response.json();


                    const farmerFarmIds =
                        farms.map(
                            (farm) =>
                                Number(farm.id)
                        );


                    irrigations =
                        irrigationData.filter(
                            (irrigation) => {

                                return (
                                    irrigation.farm &&
                                    irrigation.farm.id &&
                                    farmerFarmIds.includes(
                                        Number(
                                            irrigation.farm.id
                                        )
                                    )
                                );

                            }
                        );

                }

            } catch (error) {

                console.log(
                    "Irrigation fetch error:",
                    error
                );
            }


            // =====================================
            // CREATE ACTIVITY LIST
            // =====================================

            const activityList = [];


            // =====================================
            // FARM ACTIVITIES
            // =====================================

            farms.forEach((farm) => {

                const date =
                    getDate(farm);


                activityList.push({

                    id:
                        `farm-${farm.id}`,

                    type:
                        "farm",

                    icon:
                        <FaTractor />,

                    title:
                        `Farm: ${
                            farm.farmName ||
                            "Farm"
                        }`,

                    description:
                        farm.location
                            ? `Location: ${farm.location}`
                            : "Farm available",

                    time:
                        formatTime(date),

                    date:
                        date,

                    color:
                        "#FB8C00"

                });

            });


            // =====================================
            // PRODUCT ACTIVITIES
            // =====================================

            products.forEach((product) => {

                const quantity =
                    Number(
                        product.quantity
                    );


                const soldOut =
                    quantity <= 0 ||
                    product.status ===
                        "All Sold" ||
                    product.status ===
                        "Farm Deleted";


                const date =
                    getDate(product);


                activityList.push({

                    id:
                        `product-${product.id}`,

                    type:
                        "product",

                    icon:
                        <FaSeedling />,

                    title:
                        soldOut
                            ? `${product.productName} Sold Out`
                            : `${product.productName} Available`,

                    description:
                        soldOut
                            ? "Product stock is finished"
                            : `${product.quantity} ${
                                product.unit || ""
                              } available`,

                    time:
                        formatTime(date),

                    date:
                        date,

                    color:
                        "#2E7D32"

                });

            });


            // =====================================
            // ORDER ACTIVITIES
            // =====================================

            orders.forEach((order) => {

                const productName =
                    order.product?.productName ||
                    "Product";


                let title =
                    `New Order - ${productName}`;


                let description =
                    `Quantity: ${
                        order.quantity || 0
                    } ${
                        order.product?.unit || ""
                    }`;


                // Pending

                if (
                    order.status === "Pending"
                ) {

                    title =
                        `New Order - ${productName}`;

                    description =
                        `Quantity: ${
                            order.quantity || 0
                        } ${
                            order.product?.unit || ""
                        }`;

                }


                // Ready

                else if (
                    order.status === "Ready"
                ) {

                    title =
                        `Order Ready - ${productName}`;

                    description =
                        `Order #${order.id} is ready`;

                }


                // Processing

                else if (
                    order.status === "Processing"
                ) {

                    title =
                        `Order Processing - ${productName}`;

                    description =
                        `Order #${order.id} is being processed`;

                }


                // Delivered

                else if (
                    order.status === "Delivered"
                ) {

                    title =
                        `Order Delivered - ${productName}`;

                    description =
                        `Order #${order.id} delivered`;

                }


                const date =
                    getDate(order);


                activityList.push({

                    id:
                        `order-${order.id}`,

                    type:
                        "order",

                    icon:
                        <FaShoppingBasket />,

                    title:
                        title,

                    description:
                        description,

                    time:
                        formatTime(date),

                    date:
                        date,

                    color:
                        "#8E24AA"

                });

            });


            // =====================================
            // IRRIGATION ACTIVITIES
            // =====================================

            irrigations.forEach((irrigation) => {

                const date =
                    irrigation.irrigationDate;


                activityList.push({

                    id:
                        `irrigation-${irrigation.id}`,

                    type:
                        "irrigation",

                    icon:
                        <FaTint />,

                    title:
                        "Irrigation Recorded",

                    description:
                        irrigation.method
                            ? `Method: ${irrigation.method}`
                            : "Irrigation activity recorded",

                    time:
                        formatTime(date),

                    date:
                        date,

                    color:
                        "#039BE5"

                });

            });


            // =====================================
            // SORT BY DATE
            // =====================================

            activityList.sort((a, b) => {

                const dateA =
                    a.date
                        ? new Date(
                            a.date
                        ).getTime()
                        : 0;


                const dateB =
                    b.date
                        ? new Date(
                            b.date
                        ).getTime()
                        : 0;


                return dateB - dateA;

            });


            // =====================================
            // SHOW ONLY 4
            // =====================================

            setActivities(
                activityList.slice(0, 4)
            );


        } catch (error) {

            console.log(
                "Recent activities error:",
                error
            );

            setActivities([]);

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // LOAD + AUTO REFRESH
    // =========================================

    useEffect(() => {

        loadActivities();


        const interval =
            setInterval(
                loadActivities,
                5000
            );


        return () => {

            clearInterval(interval);

        };

    }, []);


    // =========================================
    // DISPLAY
    // =========================================

    return (

        <div className="recent-activities">

            <h2>
                Recent Activities
            </h2>


            {loading ? (

                <div className="no-activity">

                    Loading activities...

                </div>

            ) : activities.length === 0 ? (

                <div className="no-activity">

                    <FaBox />

                    <p>
                        No recent activities.
                    </p>

                </div>

            ) : (

                activities.map((item) => (

                    <div
                        className="activity-card"
                        key={item.id}
                    >

                        <div
                            className="activity-icon"
                            style={{
                                background:
                                    item.color
                            }}
                        >

                            {item.icon}

                        </div>


                        <div className="activity-info">

                            <h3>
                                {item.title}
                            </h3>


                            <p>
                                {item.description}
                            </p>


                            <span>
                                {item.time}
                            </span>

                        </div>

                    </div>

                ))

            )}

        </div>

    );
}


export default RecentActivities;