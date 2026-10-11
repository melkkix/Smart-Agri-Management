import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {

    const navigate = useNavigate();

    const [farms, setFarms] = useState([]);

    const [product, setProduct] = useState({
        productName: "",
        category: "",
        quantity: "",
        unit: "",
        price: "",
        location: "",
        status: "Available",
        farmId: ""
    });

    useEffect(() => {

        const getFarms = async () => {

            try {

                const userData =
                    localStorage.getItem("smartAgriUser");

                if (!userData) {
                    alert("Please login first.");
                    return;
                }

                const user = JSON.parse(userData);

                const response = await fetch(
                    "http://localhost:8080/api/farms"
                );

                if (!response.ok) {
                    throw new Error("Failed to get farms");
                }

                const data = await response.json();

                const farmerFarms = data.filter(
                    (farm) =>
                        farm.farmer &&
                        farm.farmer.id === user.id
                );

                setFarms(farmerFarms);

            } catch (error) {

                console.log(
                    "Error getting farms:",
                    error
                );

            }
        };

        getFarms();

    }, []);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setProduct({
            ...product,
            [name]: value
        });

        // Automatically get location from selected farm
        if (name === "farmId") {

            const selectedFarm =
                farms.find(
                    (farm) =>
                        String(farm.id) === String(value)
                );

            if (selectedFarm) {

                setProduct({
                    ...product,
                    farmId: value,
                    location: selectedFarm.location
                });

            }
        }

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !product.productName ||
            !product.category ||
            !product.quantity ||
            !product.unit ||
            !product.price ||
            !product.farmId
        ) {

            alert(
                "Please fill all required fields."
            );

            return;
        }


        const quantity =
            Number(product.quantity);

        const price =
            Number(product.price);


        if (quantity <= 0) {

            alert(
                "Quantity must be greater than 0."
            );

            return;
        }


        if (price <= 0) {

            alert(
                "Price must be greater than 0."
            );

            return;
        }


        const productData = {

            productName:
                product.productName,

            category:
                product.category,

            quantity:
                quantity,

            unit:
                product.unit,

            price:
                price,

            location:
                product.location,

            status:
                "Available",

            farm: {
                id:
                    Number(product.farmId)
            }

        };


        try {

            const response =
                await fetch(
                    "http://localhost:8080/api/products",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                productData
                            )
                    }
                );


            if (!response.ok) {

                const message =
                    await response.text();

                alert(
                    message ||
                    "Failed to add product ❌"
                );

                return;
            }


            alert(
                "Product Added Successfully ✅"
            );


            navigate(
                "/farmer/crop-management"
            );


        } catch (error) {

            console.log(
                "Add product error:",
                error
            );

            alert(
                "Backend connection error ❌"
            );

        }

    };


    return (

        <div className="add-product-page">

            <div className="add-product-card">

                <h1>
                    🌱 Add New Product
                </h1>

                <p>
                    Add products available from your farm.
                </p>


                <form onSubmit={handleSubmit}>

                    {/* Product Name */}

                    <div className="form-group">

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="productName"
                            value={
                                product.productName
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Ex: Tomato"
                        />

                    </div>


                    {/* Category */}

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <select
                            name="category"
                            value={
                                product.category
                            }
                            onChange={
                                handleChange
                            }
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option>
                                Vegetable
                            </option>

                            <option>
                                Fruit
                            </option>

                            <option>
                                Grain
                            </option>

                            <option>
                                Pulses
                            </option>

                            <option>
                                Other
                            </option>

                        </select>

                    </div>


                    {/* Farm */}

                    <div className="form-group">

                        <label>
                            Select Farm
                        </label>

                        <select
                            name="farmId"
                            value={
                                product.farmId
                            }
                            onChange={
                                handleChange
                            }
                        >

                            <option value="">
                                Select Farm
                            </option>

                            {farms.map(
                                (farm) => (

                                    <option
                                        key={farm.id}
                                        value={farm.id}
                                    >
                                        {farm.farmName}
                                        {" - "}
                                        {farm.location}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* Quantity + Unit */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Quantity
                            </label>

                            <input
                                type="number"
                                name="quantity"
                                min="1"
                                value={
                                    product.quantity
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Ex: 100"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Unit
                            </label>

                            <select
                                name="unit"
                                value={
                                    product.unit
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="">
                                    Select Unit
                                </option>

                                <option>
                                    Kg
                                </option>

                                <option>
                                    Quintal
                                </option>

                                <option>
                                    Ton
                                </option>

                                <option>
                                    Box
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* Price */}

                    <div className="form-group">

                        <label>
                            Price per Unit
                        </label>

                        <input
                            type="number"
                            name="price"
                            min="1"
                            value={
                                product.price
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Ex: 50"
                        />

                    </div>


                    {/* Location */}

                    <div className="form-group">

                        <label>
                            Farm Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={
                                product.location
                            }
                            readOnly
                            placeholder="Select a farm"
                        />

                    </div>


                    {/* Buttons */}

                    <div className="button-group">

                        <button
                            type="submit"
                            className="save-product-btn"
                        >
                            Save Product
                        </button>


                        <button
                            type="button"
                            className="cancel-product-btn"
                            onClick={() =>
                                navigate(
                                    "/farmer/crop-management"
                                )
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddProduct;