import { useEffect, useState } from "react";
import "./Reminder.css";


function Reminder() {

    const [reminders, setReminders] = useState([]);

    const [title, setTitle] = useState("");

    const [date, setDate] = useState("");

    const [type, setType] =
        useState("Irrigation");


    // =========================================
    // GET LOGGED-IN FARMER
    // =========================================

    const getLoggedInUser = () => {

        const userData =
            localStorage.getItem(
                "smartAgriUser"
            );


        if (!userData) {

            return null;

        }


        try {

            return JSON.parse(
                userData
            );

        } catch (error) {

            console.log(
                "Invalid user data:",
                error
            );

            return null;

        }

    };


    // =========================================
    // STORAGE KEY
    // =========================================

    const getStorageKey = () => {

        const user =
            getLoggedInUser();


        if (!user || !user.id) {

            return null;

        }


        return `smartAgriReminders_${user.id}`;

    };


    // =========================================
    // LOAD REMINDERS
    // =========================================

    useEffect(() => {

        const storageKey =
            getStorageKey();


        if (!storageKey) {

            setReminders([]);

            return;

        }


        const savedReminders =
            localStorage.getItem(
                storageKey
            );


        if (savedReminders) {

            try {

                setReminders(
                    JSON.parse(
                        savedReminders
                    )
                );

            } catch (error) {

                console.log(
                    "Error loading reminders:",
                    error
                );

                setReminders([]);

            }

        }

    }, []);


    // =========================================
    // SAVE REMINDERS
    // =========================================

    const saveReminders = (
        updatedReminders
    ) => {

        const storageKey =
            getStorageKey();


        if (!storageKey) {

            return;

        }


        localStorage.setItem(
            storageKey,
            JSON.stringify(
                updatedReminders
            )
        );


        setReminders(
            updatedReminders
        );

    };


    // =========================================
    // ADD REMINDER
    // =========================================

    const addReminder = (e) => {

        e.preventDefault();


        if (!title || !date) {

            alert(
                "Please fill all fields"
            );

            return;

        }


        const user =
            getLoggedInUser();


        if (
            !user ||
            user.role !== "Farmer"
        ) {

            alert(
                "Please login as a farmer."
            );

            return;

        }


        const newReminder = {

            id: Date.now(),

            title: title,

            date: date,

            type: type

        };


        const updatedReminders = [

            ...reminders,

            newReminder

        ];


        saveReminders(
            updatedReminders
        );


        setTitle("");

        setDate("");

        setType(
            "Irrigation"
        );


        alert(
            "Reminder added successfully ✅"
        );

    };


    // =========================================
    // DELETE REMINDER
    // =========================================

    const deleteReminder = (id) => {

        const updatedReminders =
            reminders.filter(
                (item) =>
                    item.id !== id
            );


        saveReminders(
            updatedReminders
        );

    };


    // =========================================
    // FORMAT DATE
    // =========================================

    const formatDate = (dateValue) => {

        if (!dateValue) {

            return "";

        }


        const date =
            new Date(
                dateValue + "T00:00:00"
            );


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    };


    return (

        <div className="reminder-page">

            <div className="reminder-header">

                <h1>
                    🔔 Farm Reminders
                </h1>

                <p>
                    Schedule and manage your important farm activities.
                </p>

            </div>


            <div className="reminder-container">


                {/* ================================= */}
                {/* ADD REMINDER */}
                {/* ================================= */}

                <div className="reminder-form-card">

                    <h2>
                        ➕ Add Reminder
                    </h2>


                    <form
                        onSubmit={addReminder}
                    >

                        <label>
                            Reminder Title
                        </label>


                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            placeholder="Ex: Irrigation for Paddy"
                        />


                        <label>
                            Date
                        </label>


                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(
                                    e.target.value
                                )
                            }
                        />


                        <label>
                            Activity Type
                        </label>


                        <select
                            value={type}
                            onChange={(e) =>
                                setType(
                                    e.target.value
                                )
                            }
                        >

                            <option>
                                Irrigation
                            </option>

                            <option>
                                Fertilizer
                            </option>

                            <option>
                                Crop Activity
                            </option>

                            <option>
                                Harvest
                            </option>

                            <option>
                                Other
                            </option>

                        </select>


                        <button type="submit">
                            Add Reminder
                        </button>

                    </form>

                </div>


                {/* ================================= */}
                {/* REMINDER LIST */}
                {/* ================================= */}

                <div className="reminder-list-card">

                    <h2>
                        📅 My Reminders
                    </h2>


                    {reminders.length === 0 ? (

                        <div className="no-reminder">

                            <div>
                                🔔
                            </div>

                            <h3>
                                No Reminders
                            </h3>

                            <p>
                                Add a reminder for your farm activities.
                            </p>

                        </div>

                    ) : (

                        reminders
                            .sort(
                                (a, b) =>
                                    a.date.localeCompare(
                                        b.date
                                    )
                            )
                            .map(
                                (reminder) => (

                                    <div
                                        className="reminder-item"
                                        key={reminder.id}
                                    >

                                        <div className="reminder-icon">
                                            🔔
                                        </div>


                                        <div className="reminder-info">

                                            <h3>
                                                {reminder.title}
                                            </h3>


                                            <p>
                                                📅{" "}
                                                {formatDate(
                                                    reminder.date
                                                )}
                                            </p>


                                            <span>
                                                {reminder.type}
                                            </span>

                                        </div>


                                        <button
                                            className="delete-reminder"
                                            onClick={() =>
                                                deleteReminder(
                                                    reminder.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                )
                            )

                    )}

                </div>

            </div>

        </div>

    );

}


export default Reminder;