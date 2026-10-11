import { useState } from "react";
import "./Complaint.css";

function Complaint() {

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");


    const submitComplaint = async (e) => {

        e.preventDefault();

        const userData =
            localStorage.getItem("smartAgriUser");

        if (!userData) {
            alert("Please login first.");
            return;
        }

        const user = JSON.parse(userData);

        if (user.role !== "Buyer") {
            alert("Only buyers can submit complaints.");
            return;
        }

        if (!subject || !message) {
            alert("Please fill all fields.");
            return;
        }

        const complaint = {
            userId: user.id,
            subject: subject,
            message: message,
            status: "Pending"
        };


        try {

            const response = await fetch(
                "http://localhost:8080/api/complaints",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(complaint)
                }
            );


            if (!response.ok) {

                const error =
                    await response.text();

                alert(
                    error ||
                    "Failed to submit complaint ❌"
                );

                return;
            }


            alert(
                "Complaint submitted successfully ✅"
            );

            setSubject("");
            setMessage("");


        } catch (error) {

            console.log(
                "Complaint error:",
                error
            );

            alert(
                "Backend connection error ❌"
            );
        }

    };


    return (

        <div className="buyer-complaint-page">

            <div className="buyer-complaint-card">

                <h1>
                    ⚠️ Submit Complaint
                </h1>

                <p>
                    Tell us about your issue and our admin team will review it.
                </p>


                <form
                    onSubmit={submitComplaint}
                    className="buyer-complaint-form"
                >

                    <div className="form-group">

                        <label>
                            Subject
                        </label>

                        <input
                            type="text"
                            placeholder="Enter complaint subject"
                            value={subject}
                            onChange={(e) =>
                                setSubject(e.target.value)
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Message
                        </label>

                        <textarea
                            rows="6"
                            placeholder="Describe your complaint"
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="buyer-submit-complaint-btn"
                    >
                        Submit Complaint
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Complaint;