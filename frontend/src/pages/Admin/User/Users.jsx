import { useEffect, useState } from "react";
import "./Users.css";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);


    const getUsers = async () => {

        try {

            const response = await fetch(
                "http://localhost:8080/api/users"
            );

            if (!response.ok) {
                throw new Error("Failed to get users");
            }

            const data = await response.json();

            setUsers(data);

        } catch (error) {

            console.log(
                "Error getting users:",
                error
            );

        }
    };


    return (

        <div className="admin-users-page">

            <h1>
                👥 User Management
            </h1>

            <p>
                View registered SmartAgri users and their roles.
            </p>


            {users.length === 0 ? (

                <p>
                    No users found.
                </p>

            ) : (

                <div className="users-table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Phone
                                </th>

                                <th>
                                    Role
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {users.map((user) => (

                                <tr key={user.id}>

                                    <td>
                                        {user.id}
                                    </td>

                                    <td>
                                        {user.name}
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td>
                                        {user.phone}
                                    </td>

                                    <td>

                                        <span
                                            className={`role-badge ${user.role?.toLowerCase()}`}
                                        >
                                            {user.role}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );
}

export default Users;