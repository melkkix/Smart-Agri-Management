import { useEffect, useState } from "react";
import "./Crops.css";

function Crops() {

    const [products, setProducts] = useState([]);

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
                throw new Error("Failed to get products");
            }

            const data = await response.json();

            setProducts(data);

        } catch (error) {

            console.log(
                "Error getting crops:",
                error
            );

        }

    };


    return (

        <div className="admin-crops-page">

            <h1>
                🌱 Crop Management
            </h1>

            <p>
                View all products and crops available in SmartAgri.
            </p>


            {products.length === 0 ? (

                <p>
                    No crops found.
                </p>

            ) : (

                <div className="crops-grid">

                    {products.map((product) => (

                        <div
                            className="crop-card"
                            key={product.id}
                        >

                            <div className="crop-icon">
                                🌾
                            </div>


                            <div className="crop-info">

                                <h2>
                                    {product.productName}
                                </h2>

                                <p>
                                    <strong>
                                        Category:
                                    </strong>{" "}
                                    {product.category}
                                </p>

                                <p>
                                    <strong>
                                        Quantity:
                                    </strong>{" "}
                                    {product.quantity}{" "}
                                    {product.unit}
                                </p>

                                <p>
                                    <strong>
                                        Price:
                                    </strong>{" "}
                                    ₹{product.price} /{" "}
                                    {product.unit}
                                </p>

                                <p>
                                    <strong>
                                        Location:
                                    </strong>{" "}
                                    {product.location}
                                </p>

                                <span className="crop-status">
                                    {product.status}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default Crops;