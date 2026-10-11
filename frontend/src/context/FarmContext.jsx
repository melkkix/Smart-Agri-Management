import { createContext, useState, useEffect } from "react";

export const FarmContext = createContext();


function FarmProvider({ children }) {

    const [farms, setFarms] = useState([]);


    // =========================================
    // GET LOGGED-IN USER
    // =========================================

    const getLoggedInUser = () => {

        const user =
            localStorage.getItem(
                "smartAgriUser"
            );


        if (!user) {

            return null;

        }


        try {

            return JSON.parse(user);

        } catch (error) {

            console.log(
                "Invalid user data:",
                error
            );

            return null;

        }

    };


    // =========================================
    // GET FARMER FARMS
    // =========================================

    const getFarms = async () => {

        try {

            const user =
                getLoggedInUser();


            if (
                !user ||
                user.role !== "Farmer"
            ) {

                setFarms([]);

                return;

            }


            const response =
                await fetch(
                    `http://localhost:8080/api/farms?farmerId=${user.id}`,
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to get farms"
                );

            }


            const data =
                await response.json();


            setFarms(data);


        } catch (error) {

            console.log(
                "Error getting farms:",
                error
            );

        }

    };


    // =========================================
    // LOAD FARMS
    // =========================================

    useEffect(() => {

        getFarms();

    }, []);


    // =========================================
    // ADD FARM
    // =========================================

    const addFarm = async (farm) => {

        try {

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


            const newFarm = {

                ...farm,

                status: "Active"

            };


            delete newFarm.id;


            const response =
                await fetch(
                    `http://localhost:8080/api/farms?farmerId=${user.id}`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                newFarm
                            )
                    }
                );


            if (!response.ok) {

                const message =
                    await response.text();


                throw new Error(
                    message ||
                    "Failed to add farm"
                );

            }


            const savedFarm =
                await response.json();


            setFarms(
                (prev) => [
                    ...prev,
                    savedFarm
                ]
            );


        } catch (error) {

            console.log(
                "Error adding farm:",
                error
            );


            alert(
                error.message ||
                "Failed to add farm."
            );

        }

    };


    // =========================================
    // DELETE FARM
    // =========================================

    const deleteFarm = async (id) => {

        try {

            const user =
                getLoggedInUser();


            if (
                !user ||
                user.role !== "Farmer"
            ) {

                alert(
                    "Please login as a farmer."
                );

                return false;

            }


            // -------------------------------------
            // DELETE REQUEST
            // -------------------------------------

            const response =
                await fetch(
                    `http://localhost:8080/api/farms/${id}`,
                    {
                        method: "DELETE"
                    }
                );


            // -------------------------------------
            // CHECK BACKEND RESPONSE
            // -------------------------------------

            if (!response.ok) {

                const message =
                    await response.text();


                console.log(
                    "Delete farm failed:",
                    message
                );


                alert(
                    message ||
                    "Farm could not be deleted."
                );


                // Reload actual database data

                await getFarms();


                return false;

            }


            // -------------------------------------
            // DELETE SUCCESS
            // -------------------------------------

            const message =
                await response.text();


            console.log(
                "Delete farm:",
                message
            );


            // Remove from frontend immediately

            setFarms(
                (prev) =>
                    prev.filter(
                        (farm) =>
                            Number(farm.id) !==
                            Number(id)
                    )
            );


            // Reload from database

            await getFarms();


            alert(
                "Farm deleted successfully ✅"
            );


            return true;


        } catch (error) {

            console.log(
                "Error deleting farm:",
                error
            );


            alert(
                "Unable to delete farm. Please check the backend."
            );


            // Get actual database data again

            await getFarms();


            return false;

        }

    };


    // =========================================
    // UPDATE FARM
    // =========================================

    const updateFarm =
        async (updatedFarm) => {

            try {

                const response =
                    await fetch(
                        `http://localhost:8080/api/farms/${updatedFarm.id}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    updatedFarm
                                )
                        }
                    );


                if (!response.ok) {

                    const message =
                        await response.text();


                    throw new Error(
                        message ||
                        "Failed to update farm"
                    );

                }


                const savedFarm =
                    await response.json();


                setFarms(
                    (prev) =>
                        prev.map(
                            (farm) =>
                                Number(
                                    farm.id
                                ) ===
                                Number(
                                    savedFarm.id
                                )
                                    ? savedFarm
                                    : farm
                        )
                );


                return savedFarm;


            } catch (error) {

                console.log(
                    "Error updating farm:",
                    error
                );


                alert(
                    error.message ||
                    "Failed to update farm."
                );


                return null;

            }

        };


    // =========================================
    // CONTEXT
    // =========================================

    return (

        <FarmContext.Provider
            value={{
                farms,
                addFarm,
                deleteFarm,
                updateFarm,
                getFarms
            }}
        >

            {children}

        </FarmContext.Provider>

    );

}


export default FarmProvider;