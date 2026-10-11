import { useEffect, useState } from "react";

function Notifications() {

    const [notifications, setNotifications] = useState([]);


    useEffect(() => {

        getNotifications();

    }, []);


    const getNotifications = async () => {

        try {

            const userData =
                localStorage.getItem("smartAgriUser");


            if (!userData) {
                return;
            }


            const user =
                JSON.parse(userData);


            // GET NOTIFICATIONS

            const response = await fetch(
                `http://localhost:8080/api/notifications/${user.id}`,
                {
                    cache: "no-store"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Failed to get notifications"
                );

            }


            const data =
                await response.json();


            setNotifications(data);


            // ⭐ MARK ALL AS READ

            const readResponse = await fetch(
                `http://localhost:8080/api/notifications/user/${user.id}/read`,
                {
                    method: "PUT"
                }
            );


            if (!readResponse.ok) {

                console.log(
                    "Failed to mark notifications as read"
                );

                return;
            }


            console.log(
                "All notifications marked as read"
            );


        } catch (error) {

            console.log(
                "Error getting notifications:",
                error
            );

        }

    };


    return (

        <div className="notifications-page">

            <h1>
                🔔 Notifications
            </h1>


            <p>
                Your latest SmartAgri notifications.
            </p>


            {notifications.length === 0 ? (

                <p>
                    No notifications.
                </p>

            ) : (

                <div className="notifications-list">

                    {notifications.map(
                        (notification) => (

                            <div
                                className="notification-card"
                                key={notification.id}
                            >

                                <span>
                                    🔔
                                </span>


                                <p>
                                    {notification.message}
                                </p>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );
}

export default Notifications;