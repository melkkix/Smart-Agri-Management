import { useEffect, useState } from "react";

import "./CropOverview.css";

import {
    FaSeedling,
    FaLeaf,
    FaCheckCircle,
    FaTint
} from "react-icons/fa";


function CropOverview() {

    const [activeCrops, setActiveCrops] =
        useState(0);

    const [healthyCrops, setHealthyCrops] =
        useState(0);

    const [harvestReady, setHarvestReady] =
        useState(0);

    const [needIrrigation, setNeedIrrigation] =
        useState(0);

    const [loading, setLoading] =
        useState(true);


    // =========================================
    // GET LOGGED-IN USER
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
                "User data error:",
                error
            );

            return null;

        }

    };


    // =========================================
    // LOAD CROP DATA
    // =========================================

    const loadCropData = async () => {

        try {

            const user =
                getLoggedInUser();


            if (
                !user ||
                !user.id ||
                user.role !== "Farmer"
            ) {

                setActiveCrops(0);

                setHealthyCrops(0);

                setHarvestReady(0);

                setNeedIrrigation(0);

                setLoading(false);

                return;

            }


            // =====================================
            // GET FARMER PRODUCTS
            // =====================================

            const productResponse =
                await fetch(
                    `http://localhost:8080/api/products?farmerId=${user.id}`,
                    {
                        cache: "no-store"
                    }
                );


            if (!productResponse.ok) {

                throw new Error(
                    "Failed to get farmer products"
                );

            }


            const products =
                await productResponse.json();


            // =====================================
            // ACTIVE CROPS
            // =====================================

            const active =
                products.filter(
                    (product) =>
                        Number(
                            product.quantity
                        ) > 0
                );


            setActiveCrops(
                active.length
            );


            // =====================================
            // HEALTHY CROPS
            // =====================================

            const healthy =
                products.filter(
                    (product) =>
                        Number(
                            product.quantity
                        ) > 0 &&
                        (
                            product.status ===
                            "Active"
                            ||
                            product.status ===
                            "Healthy"
                        )
                );


            setHealthyCrops(
                healthy.length
            );


            // =====================================
            // HARVEST READY
            // =====================================

            const ready =
                products.filter(
                    (product) =>
                        product.status ===
                        "Ready"
                );


            setHarvestReady(
                ready.length
            );


            // =====================================
            // IRRIGATION
            // =====================================
            //
            // We should NOT create fake
            // irrigation numbers.
            //
            // Your current Product entity does
            // not contain a field saying that a
            // crop "needs irrigation".
            //
            // Therefore we keep this at 0 until
            // the actual irrigation/crop logic
            // is connected.
            //

            setNeedIrrigation(0);


        } catch (error) {

            console.log(
                "Crop overview error:",
                error
            );

            setActiveCrops(0);

            setHealthyCrops(0);

            setHarvestReady(0);

            setNeedIrrigation(0);

        } finally {

            setLoading(false);

        }

    };


    // =========================================
    // LOAD + AUTO REFRESH
    // =========================================

    useEffect(() => {

        loadCropData();


        const interval =
            setInterval(
                loadCropData,
                5000
            );


        return () => {

            clearInterval(
                interval
            );

        };

    }, []);


    // =========================================
    // CARDS
    // =========================================

    const crops = [

        {
            icon:
                <FaSeedling />,

            title:
                "Active Crops",

            value:
                activeCrops,

            color:
                "#2E7D32"

        },


        {
            icon:
                <FaLeaf />,

            title:
                "Healthy Crops",

            value:
                healthyCrops,

            color:
                "#43A047"

        },


        {
            icon:
                <FaCheckCircle />,

            title:
                "Harvest Ready",

            value:
                harvestReady,

            color:
                "#FB8C00"

        },


        {
            icon:
                <FaTint />,

            title:
                "Need Irrigation",

            value:
                needIrrigation,

            color:
                "#039BE5"

        }

    ];


    // =========================================
    // UI
    // =========================================

    return (

        <div className="crop-overview">

            <h2>
                Crop Overview
            </h2>


            <div className="crop-grid">

                {crops.map(
                    (
                        crop,
                        index
                    ) => (

                        <div
                            className="crop-card"
                            key={index}
                        >

                            <div
                                className="crop-icon"
                                style={{
                                    background:
                                        crop.color
                                }}
                            >

                                {crop.icon}

                            </div>


                            <h3>

                                {loading
                                    ? "..."
                                    : crop.value
                                }

                            </h3>


                            <p>
                                {crop.title}
                            </p>

                        </div>

                    )
                )}

            </div>

        </div>

    );

}


export default CropOverview;