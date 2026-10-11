import { useEffect, useState } from "react";
import "./Buyers.css";

function Buyers() {

    const [buyers, setBuyers] = useState([]);

    useEffect(() => {
        getBuyers();
    }, []);


    const getBuyers = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/users"
            );

            if (!response.ok) {
                throw new Error("Failed to get users");
            }

            const data = await response.json();

            const buyerUsers =
                data.filter(
                    (user) => user.role === "Buyer"
                );

            setBuyers(buyerUsers);

        } catch (error) {

            console.log(
                "Error getting buyers:",
                error
            );

        }

    };


    return (

        <div className="admin-buyers-page">

            <h1>
                🛒 Buyer Management
            </h1>

            <p>
                View all registered buyers in SmartAgri.
            </p>


            {buyers.length === 0 ? (

                <p>
                    No buyers found.
                </p>

            ) : (

                <div className="buyers-grid">

                    {buyers.map((buyer) => (

                        <div
                            className="buyer-card"
                            key={buyer.id}
                        >

                            <div className="buyer-icon">
                                🛒
                            </div>


                            <div className="buyer-info">

                                <h2>
                                    {buyer.name}
                                </h2>

                                <p>
                                    <strong>
                                        Email:
                                    </strong>{" "}
                                    {buyer.email}
                                </p>

                                <p>
                                    <strong>
                                        Phone:
                                    </strong>{" "}
                                    {buyer.phone}
                                </p>

                                <span className="buyer-role">
                                    Buyer
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default Buyers;