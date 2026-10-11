import { useEffect, useState } from "react";
import "./Marketplace.css";

function Marketplace() {

    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});


    // =========================================
    // GET PRODUCTS
    // =========================================

    useEffect(() => {

        getProducts();

    }, []);


    const getProducts = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/products",
                {
                    cache: "no-store"
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to get products"
                );

            }

            const data =
                await response.json();

            setProducts(data);

        } catch (error) {

            console.log(
                "Error getting products:",
                error
            );

        }

    };


    // =========================================
    // QUANTITY CHANGE
    // =========================================

    const handleQuantityChange = (
        id,
        value
    ) => {

        setQuantities({

            ...quantities,

            [id]: value

        });

    };


    // =========================================
    // BUY PRODUCT
    // =========================================

    const buyProduct = async (product) => {

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


        if (user.role !== "Buyer") {

            alert(
                "Only buyers can place orders."
            );

            return;
        }


        // -----------------------------------------
        // CHECK IF PRODUCT IS SOLD OUT
        // -----------------------------------------

        if (
            product.quantity <= 0 ||
            product.status === "All Sold"
        ) {

            alert(
                "This product is sold out."
            );

            await getProducts();

            return;
        }


        const quantity =
            Number(
                quantities[product.id] || 1
            );


        // -----------------------------------------
        // VALIDATE QUANTITY
        // -----------------------------------------

        if (
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {

            alert(
                "Please enter a valid quantity."
            );

            return;
        }


        // -----------------------------------------
        // CHECK AVAILABLE STOCK
        // -----------------------------------------

        if (quantity > product.quantity) {

            alert(
                `Only ${product.quantity} ${product.unit} available.`
            );

            await getProducts();

            return;
        }


        if (product.quantity <= 0) {

            alert(
                "This product is out of stock."
            );

            return;
        }


        // -----------------------------------------
        // CALCULATE TOTAL
        // -----------------------------------------

        const totalPrice =
            quantity * product.price;


        // -----------------------------------------
        // CREATE ORDER
        // -----------------------------------------

        const order = {

            quantity: quantity,

            totalPrice: totalPrice,

            status: "Pending",

            product: {
                id: product.id
            },

            buyer: {
                id: user.id
            }

        };


        try {

            const response = await fetch(
                "http://localhost:8080/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(order)

                }
            );


            if (!response.ok) {

                const message =
                    await response.text();

                alert(
                    message ||
                    "Failed to place order ❌"
                );

                // Refresh stock
                await getProducts();

                return;
            }


            alert(
                "Order Placed Successfully ✅"
            );


            // -------------------------------------
            // RESET QUANTITY
            // -------------------------------------

            setQuantities({

                ...quantities,

                [product.id]: 1

            });


            // -------------------------------------
            // REFRESH PRODUCTS
            // -------------------------------------

            await getProducts();


        } catch (error) {

            console.log(
                "Order error:",
                error
            );

            alert(
                "Backend connection error ❌"
            );

        }

    };


    // =========================================
    // ONLY AVAILABLE PRODUCTS
    // =========================================
    
    const availableProducts =
        products.filter(
            (product) =>
                Number(product.quantity) > 0 &&
                product.status !== "All Sold"
        );


    return (

        <div className="marketplace-page">


            {/* =====================================
                HEADER
            ====================================== */}

            <div className="marketplace-header">

                <h1>
                    🛒 Marketplace
                </h1>

                <p>
                    Buy fresh products from farmers.
                </p>

            </div>


            {/* =====================================
                PRODUCT GRID
            ====================================== */}

            <div className="product-grid">


                {/* =================================
                    NO AVAILABLE PRODUCTS
                ================================== */}

                {availableProducts.length === 0 ? (

                    <div className="no-products">

                        <h2>
                            🌾 No Products Available
                        </h2>

                        <p>
                            All products are currently sold out.
                            Please check again later.
                        </p>

                    </div>

                ) : (


                    /* =================================
                       SHOW AVAILABLE PRODUCTS ONLY
                    ================================== */

                    availableProducts.map(
                        (product) => {

                            const quantity =
                                Number(
                                    quantities[
                                        product.id
                                    ] || 1
                                );


                            const total =
                                quantity *
                                product.price;


                            return (

                                <div
                                    className="product-card"
                                    key={
                                        product.id
                                    }
                                >


                                    {/* PRODUCT IMAGE */}

                                    <div className="product-image">

                                        🌾

                                    </div>


                                    {/* PRODUCT NAME */}

                                    <h2>
                                        {
                                            product.productName
                                        }
                                    </h2>


                                    {/* CATEGORY */}

                                    <p className="category">

                                        {
                                            product.category
                                        }

                                    </p>


                                    {/* AVAILABLE QUANTITY */}

                                    <p>

                                        Available:{" "}

                                        {
                                            product.quantity
                                        }{" "}

                                        {
                                            product.unit
                                        }

                                    </p>


                                    {/* LOCATION */}

                                    <p>

                                        Location:{" "}

                                        {
                                            product.location
                                        }

                                    </p>


                                    {/* PRICE */}

                                    <h3>

                                        ₹
                                        {
                                            product.price
                                        }{" "}

                                        /{" "}

                                        {
                                            product.unit
                                        }

                                    </h3>


                                    {/* QUANTITY */}

                                    <div className="quantity-box">

                                        <label>
                                            Quantity
                                        </label>


                                        <input
                                            type="number"

                                            min="1"

                                            max={
                                                product.quantity
                                            }

                                            value={
                                                quantity
                                            }

                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    product.id,
                                                    e.target.value
                                                )
                                            }
                                        />


                                        <span>

                                            {
                                                product.unit
                                            }

                                        </span>

                                    </div>


                                    {/* TOTAL */}

                                    <p className="total-price">

                                        Total: ₹
                                        {
                                            total
                                        }

                                    </p>


                                    {/* STATUS */}

                                    <span className="available">

                                        Available

                                    </span>


                                    {/* BUY BUTTON */}

                                    <button
                                        className="buy-btn"

                                        onClick={() =>
                                            buyProduct(
                                                product
                                            )
                                        }
                                    >

                                        Buy Now

                                    </button>


                                </div>

                            );

                        }
                    )

                )}

            </div>

        </div>

    );

}

export default Marketplace;