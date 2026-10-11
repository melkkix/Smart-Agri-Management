import { useEffect, useState } from "react";
import "./Complaints.css";

function Complaints() {

    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        getComplaints();
    }, []);


    const getComplaints = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/complaints",
                {
                    cache: "no-store"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to get complaints");
            }

            const data = await response.json();

            setComplaints(data);

        } catch (error) {

            console.log(
                "Error getting complaints:",
                error
            );

        }

    };


    const updateStatus = async (id, status) => {

        try {

            const response = await fetch(
                `http://localhost:8080/api/complaints/${id}/status?status=${status}`,
                {
                    method: "PUT"
                }
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to update complaint"
                );

            }

            alert("Complaint status updated ✅");

            getComplaints();

        } catch (error) {

            console.log(
                "Error updating complaint:",
                error
            );

            alert(
                "Failed to update complaint ❌"
            );

        }

    };


    return (

        <div className="admin-complaints-page">

            <h1>
                ⚠️ Complaint Management
            </h1>

            <p>
                View and manage user complaints.
            </p>


            {complaints.length === 0 ? (

                <p>
                    No complaints found.
                </p>

            ) : (

                <div className="complaints-list">

                    {complaints.map((complaint) => (

                        <div
                            className="complaint-card"
                            key={complaint.id}
                        >

                            <div className="complaint-header">

                                <h2>
                                    Complaint #{complaint.id}
                                </h2>

                                <span
                                    className={
                                        `complaint-status ${complaint.status?.toLowerCase().replace(" ", "-")}`
                                    }
                                >
                                    {complaint.status}
                                </span>

                            </div>


                            <p>
                                <strong>
                                    User ID:
                                </strong>{" "}
                                {complaint.userId}
                            </p>


                            <p>
                                <strong>
                                    Subject:
                                </strong>{" "}
                                {complaint.subject}
                            </p>


                            <p>
                                <strong>
                                    Message:
                                </strong>{" "}
                                {complaint.message}
                            </p>


                            <div className="complaint-actions">

                                {complaint.status === "Pending" && (

                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                complaint.id,
                                                "In Progress"
                                            )
                                        }
                                    >
                                        🔵 Start Working
                                    </button>

                                )}


                                {complaint.status === "In Progress" && (

                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                complaint.id,
                                                "Resolved"
                                            )
                                        }
                                    >
                                        ✅ Mark Resolved
                                    </button>

                                )}


                                {complaint.status === "Resolved" && (

                                    <p>
                                        ✅ Complaint Resolved
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

export default Complaints;