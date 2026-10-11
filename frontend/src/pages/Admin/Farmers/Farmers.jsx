import { useEffect, useState } from "react";
import "./Farmers.css";

function Farmers() {

    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        getFarmers();
    }, []);


    const getFarmers = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/users"
            );

            if (!response.ok) {
                throw new Error("Failed to get users");
            }

            const data = await response.json();

            const farmerUsers =
                data.filter(
                    (user) => user.role === "Farmer"
                );

            setFarmers(farmerUsers);

        } catch (error) {

            console.log(
                "Error getting farmers:",
                error
            );

        }

    };


    return (

        <div className="admin-farmers-page">

            <h1>
                🌾 Farmer Management
            </h1>

            <p>
                View all registered farmers in SmartAgri.
            </p>


            {farmers.length === 0 ? (

                <p>
                    No farmers found.
                </p>

            ) : (

                <div className="farmers-grid">

                    {farmers.map((farmer) => (

                        <div
                            className="farmer-card"
                            key={farmer.id}
                        >

                            <div className="farmer-icon">
                                🌾
                            </div>


                            <div className="farmer-info">

                                <h2>
                                    {farmer.name}
                                </h2>

                                <p>
                                    <strong>
                                        Email:
                                    </strong>{" "}
                                    {farmer.email}
                                </p>

                                <p>
                                    <strong>
                                        Phone:
                                    </strong>{" "}
                                    {farmer.phone}
                                </p>

                                <span className="farmer-role">
                                    Farmer
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default Farmers;