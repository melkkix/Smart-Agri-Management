import "./CropManagement.css";

import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";

import { useEffect, useState } from "react";

function CropManagement() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    // =========================================
    // GET FARMER PRODUCTS
    // =========================================

    const getProducts = async () => {

        try {

            const userData =
                localStorage.getItem(
                    "smartAgriUser"
                );


            if (!userData) {

                alert(
                    "Please login first."
                );

                return;

            }


            const user =
                JSON.parse(userData);


            // -------------------------------------
            // CHECK FARMER
            // -------------------------------------

            if (user.role !== "Farmer") {

                alert(
                    "Only farmers can access Crop Management."
                );

                return;

            }


            // -------------------------------------
            // GET ONLY THIS FARMER'S PRODUCTS
            // -------------------------------------

            const response = await fetch(
                `http://localhost:8080/api/products?farmerId=${user.id}`,
                {
                    cache: "no-store"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to get farmer products"
                );

            }


            const data =
                await response.json();


            setProducts(data);


        } catch (error) {

            console.log(
                "Error getting farmer products:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // LOAD PRODUCTS
    // =========================================

    useEffect(() => {

        getProducts();


        // Refresh every 2 seconds
        // so buyer purchases update automatically

        const interval =
            setInterval(
                getProducts,
                2000
            );


        return () => {

            clearInterval(interval);

        };

    }, []);


    // =========================================
    // STATUS CLASS
    // =========================================

    const getStatusClass = (
        status,
        quantity
    ) => {

        if (
            Number(quantity) <= 0 ||
            status === "All Sold"
        ) {

            return "sold";

        }

        return "active";

    };


    return (

        <div className="crop-page">

            <Sidebar />


            <div className="dashboard-content">

                <Topbar />


                <div className="crop-management">


                    {/* =================================
                        HEADER
                    ================================= */}

                    <div className="crop-header">

                        <div>

                            <h1>
                                🌱 Crop Management
                            </h1>

                            <p>
                                Manage your available farm products.
                            </p>

                        </div>


                        <button
                            className="add-crop-btn"
                            onClick={() =>
                                window.location.href =
                                "/farmer/add-product"
                            }
                        >
                            + Add Product
                        </button>

                    </div>


                    {/* =================================
                        TABLE
                    ================================= */}

                    <div className="crop-table">

                        <table>

                            <thead>

                                <tr>

                                    <th>
                                        Product
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Quantity
                                    </th>

                                    <th>
                                        Price
                                    </th>

                                    <th>
                                        Location
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>


                                {/* LOADING */}

                                {loading ? (

                                    <tr>

                                        <td colSpan="6">

                                            Loading your products...

                                        </td>

                                    </tr>

                                ) : products.length === 0 ? (

                                    /* NO PRODUCTS */

                                    <tr>

                                        <td colSpan="6">

                                            No products available
                                            for your farm.

                                        </td>

                                    </tr>

                                ) : (

                                    /* PRODUCTS */

                                    products.map(
                                        (product) => (

                                            <tr
                                                key={
                                                    product.id
                                                }
                                            >


                                                {/* PRODUCT */}

                                                <td>

                                                    {
                                                        product.productName
                                                    }

                                                </td>


                                                {/* CATEGORY */}

                                                <td>

                                                    {
                                                        product.category
                                                    }

                                                </td>


                                                {/* QUANTITY */}

                                                <td>

                                                    <strong
                                                        className={
                                                            Number(
                                                                product.quantity
                                                            ) <= 0
                                                                ? "zero-stock"
                                                                : ""
                                                        }
                                                    >

                                                        {
                                                            product.quantity
                                                        }

                                                    </strong>

                                                    {" "}

                                                    {
                                                        product.unit
                                                    }

                                                </td>


                                                {/* PRICE */}

                                                <td>

                                                    ₹
                                                    {
                                                        product.price
                                                    }

                                                </td>


                                                {/* LOCATION */}

                                                <td>

                                                    {
                                                        product.location
                                                    }

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span
                                                        className={
                                                            getStatusClass(
                                                                product.status,
                                                                product.quantity
                                                            )
                                                        }
                                                    >

                                                        {
                                                            Number(
                                                                product.quantity
                                                            ) <= 0
                                                                ? "All Sold"
                                                                : (
                                                                    product.status ||
                                                                    "Available"
                                                                )
                                                        }

                                                    </span>

                                                </td>


                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CropManagement;