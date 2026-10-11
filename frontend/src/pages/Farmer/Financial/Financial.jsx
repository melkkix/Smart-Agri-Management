import { useContext, useMemo } from "react";
import "./Financial.css";
import { FarmContext } from "../../../context/FarmContext";


function Finance() {

    const { farms } = useContext(FarmContext);

    const farm = farms && farms.length > 0
        ? farms[0]
        : null;


    const cropData = {

        Paddy: {
            seed: 3000,
            fertilizer: 5000,
            irrigation: 3500,
            labour: 7000,
            other: 2000,
            income: 45000
        },

        Sugarcane: {
            seed: 5000,
            fertilizer: 7000,
            irrigation: 4500,
            labour: 9000,
            other: 2500,
            income: 60000
        },

        Banana: {
            seed: 6000,
            fertilizer: 6500,
            irrigation: 5000,
            labour: 8500,
            other: 2500,
            income: 70000
        },

        Tomato: {
            seed: 3500,
            fertilizer: 5500,
            irrigation: 3000,
            labour: 6500,
            other: 2000,
            income: 50000
        },

        Maize: {
            seed: 2500,
            fertilizer: 4500,
            irrigation: 3000,
            labour: 5500,
            other: 1500,
            income: 38000
        },

        Cotton: {
            seed: 4500,
            fertilizer: 6000,
            irrigation: 3500,
            labour: 7500,
            other: 2500,
            income: 55000
        }

    };


    const finance = useMemo(() => {

        if (!farm) return null;

        const crop = farm.cropType || "Paddy";

        const data =
            cropData[crop] || cropData.Paddy;


        let area = parseFloat(
            String(farm.farmSize || "1")
                .replace(/[^0-9.]/g, "")
        );


        if (!area || area <= 0) {
            area = 1;
        }


        const seed =
            Math.round(data.seed * area);

        const fertilizer =
            Math.round(data.fertilizer * area);

        const irrigation =
            Math.round(data.irrigation * area);

        const labour =
            Math.round(data.labour * area);

        const other =
            Math.round(data.other * area);


        const totalExpense =
            seed +
            fertilizer +
            irrigation +
            labour +
            other;


        const expectedIncome =
            Math.round(data.income * area);


        const profit =
            expectedIncome - totalExpense;


        return {
            crop,
            area,
            seed,
            fertilizer,
            irrigation,
            labour,
            other,
            totalExpense,
            expectedIncome,
            profit
        };

    }, [farm]);


    return (

        <div className="finance-page">

            <div className="finance-header">

                <h1>💰 Farm Finance</h1>

                <p>
                    Track your estimated farming expenses,
                    income and profit.
                </p>

            </div>


            {!farm ? (

                <div className="finance-empty">

                    <div>🌾</div>

                    <h2>No Farm Added</h2>

                    <p>
                        Add a farm to view your financial analysis.
                    </p>

                </div>

            ) : (

                <>

                    <div className="finance-farm-card">

                        <div className="farm-icon">
                            🌾
                        </div>

                        <div>

                            <p>Current Farm</p>

                            <h2>
                                {farm.farmName}
                            </h2>

                            <span>
                                📍 {farm.location}
                            </span>

                        </div>

                    </div>


                    <div className="finance-summary">

                        <div className="finance-summary-card">

                            <span>🌱 Crop</span>

                            <h2>
                                {finance.crop}
                            </h2>

                        </div>


                        <div className="finance-summary-card">

                            <span>📐 Farm Area</span>

                            <h2>
                                {finance.area} Acres
                            </h2>

                        </div>


                        <div className="finance-summary-card expense">

                            <span>📉 Total Expense</span>

                            <h2>
                                ₹{finance.totalExpense}
                            </h2>

                        </div>


                        <div className="finance-summary-card income">

                            <span>💵 Expected Income</span>

                            <h2>
                                ₹{finance.expectedIncome}
                            </h2>

                        </div>


                        <div className="finance-summary-card profit">

                            <span>📈 Estimated Profit</span>

                            <h2>
                                ₹{finance.profit}
                            </h2>

                        </div>

                    </div>


                    <div className="expense-card">

                        <h2>
                            📊 Expense Breakdown
                        </h2>


                        <div className="expense-row">

                            <span>🌱 Seeds</span>

                            <strong>
                                ₹{finance.seed}
                            </strong>

                        </div>


                        <div className="expense-row">

                            <span>🧪 Fertilizer</span>

                            <strong>
                                ₹{finance.fertilizer}
                            </strong>

                        </div>


                        <div className="expense-row">

                            <span>💧 Irrigation</span>

                            <strong>
                                ₹{finance.irrigation}
                            </strong>

                        </div>


                        <div className="expense-row">

                            <span>👷 Labour</span>

                            <strong>
                                ₹{finance.labour}
                            </strong>

                        </div>


                        <div className="expense-row">

                            <span>📦 Other Expenses</span>

                            <strong>
                                ₹{finance.other}
                            </strong>

                        </div>


                        <div className="expense-total">

                            <span>
                                Total Expenses
                            </span>

                            <strong>
                                ₹{finance.totalExpense}
                            </strong>

                        </div>

                    </div>


                    <div className="finance-profit-card">

                        <div>

                            <p>
                                Estimated Profit
                            </p>

                            <h1>
                                ₹{finance.profit}
                            </h1>

                        </div>

                        <div className="profit-icon">
                            📈
                        </div>

                    </div>


                    <div className="finance-note">

                        💡 These are estimated values based on
                        crop type and farm area. Actual costs and
                        income may vary depending on local prices,
                        weather, yield and market conditions.

                    </div>

                </>

            )}

        </div>

    );
}


export default Finance;