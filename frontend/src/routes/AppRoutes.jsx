import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";

// FARMER
import Dashboard from "../pages/Farmer/Dashboard/Dashboard";
import FarmManagement from "../pages/Farmer/FarmManagement/FarmManagement";
import AddFarm from "../pages/Farmer/AddFarm/AddFarm";
import CropManagement from "../pages/Farmer/CropManagement/CropManagement";
import AddProduct from "../pages/Farmer/AddProduct/AddProduct";
import FarmerOrders from "../pages/Farmer/Orders/Orders";
import FarmerNotifications from "../pages/Farmer/Notifications/Notifications";
import FarmerComplaint from "../pages/Farmer/Complaint/Complaint";

import Weather from "../pages/Farmer/Weather/Weather";
import Irrigation from "../pages/Farmer/Irrigation/Irrigation";
import Fertilizer from "../pages/Farmer/Fertilizer/Fertilizer";
import MarketPrice from "../pages/Farmer/MarketPrice/MarketPrice";
import Reminder from "../pages/Farmer/Reminder/Reminder";
import Settings from "../pages/Farmer/Settings/Settings";

// IMPORTANT: actual folder is Financial
import Finance from "../pages/Farmer/Financial/Financial";

// BUYER
import Marketplace from "../pages/Buyer/Marketplace/Marketplace";
import Orders from "../pages/Buyer/Orders/Orders";
import BuyerNotifications from "../pages/Buyer/Notifications/Notifications";
import BuyerDashboard from "../pages/Buyer/Dashboard/Dashboard";
import BuyerComplaint from "../pages/Buyer/Complaint/Complaint";
import BuyerSettings from "../pages/Buyer/Settings/Settings";

// ADMIN
import AdminDashboard from "../pages/Admin/Dashboard/Dashboard";
import AdminOrders from "../pages/Admin/Orders/Orders";
import AdminNotifications from "../pages/Admin/Notifications/Notifications";
import AdminUsers from "../pages/Admin/User/Users";
import AdminFarmers from "../pages/Admin/Farmers/Farmers";
import AdminBuyers from "../pages/Admin/Buyers/Buyers";
import AdminCrops from "../pages/Admin/Crops/Crops";
import AdminComplaints from "../pages/Admin/Complaints/Complaints";
import AdminReports from "../pages/Admin/Reports/Reports";


function AppRoutes() {

    return (

        <Routes>

            {/* HOME */}

            <Route
                path="/"
                element={<Home />}
            />


            {/* AUTH */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/reset-password"
                element={<ResetPassword />}
            />


            {/* ========================= */}
            {/* FARMER */}
            {/* ========================= */}

            <Route
                path="/farmer/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/farmer/farm-management"
                element={<FarmManagement />}
            />

            <Route
                path="/farmer/add-farm"
                element={<AddFarm />}
            />

            <Route
                path="/farmer/crop-management"
                element={<CropManagement />}
            />

            <Route
                path="/farmer/add-product"
                element={<AddProduct />}
            />

            <Route
                path="/farmer/orders"
                element={<FarmerOrders />}
            />

            <Route
                path="/farmer/notifications"
                element={<FarmerNotifications />}
            />

            <Route
                path="/farmer/complaint"
                element={<FarmerComplaint />}
            />

            {/* WEATHER */}

            <Route
                path="/farmer/weather"
                element={<Weather />}
            />

            {/* IRRIGATION */}

            <Route
                path="/farmer/irrigation"
                element={<Irrigation />}
            />

            {/* FERTILIZER */}

            <Route
                path="/farmer/fertilizer"
                element={<Fertilizer />}
            />

            {/* MARKET PRICE */}

            <Route
                path="/farmer/market-price"
                element={<MarketPrice />}
            />

            {/* FINANCE */}

            <Route
                path="/farmer/finance"
                element={<Finance />}
            />
            <Route
    path="/farmer/reminder"
    element={<Reminder />}
/>
<Route
    path="/farmer/settings"
    element={<Settings />}
/>


            {/* ========================= */}
            {/* BUYER */}
            {/* ========================= */}

            <Route
                path="/buyer/dashboard"
                element={<BuyerDashboard />}
            />

            <Route
                path="/buyer/marketplace"
                element={<Marketplace />}
            />

            <Route
                path="/buyer/orders"
                element={<Orders />}
            />

            <Route
                path="/buyer/notifications"
                element={<BuyerNotifications />}
            />

            <Route
                path="/buyer/complaint"
                element={<BuyerComplaint />}
            />
            <Route
    path="/buyer/settings"
    element={<BuyerSettings />}
/>


            {/* ========================= */}
            {/* ADMIN */}
            {/* ========================= */}

            <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
            />

            <Route
                path="/admin/users"
                element={<AdminUsers />}
            />

            <Route
                path="/admin/farmers"
                element={<AdminFarmers />}
            />

            <Route
                path="/admin/buyers"
                element={<AdminBuyers />}
            />

            <Route
                path="/admin/crops"
                element={<AdminCrops />}
            />

            <Route
                path="/admin/orders"
                element={<AdminOrders />}
            />

            <Route
                path="/admin/complaints"
                element={<AdminComplaints />}
            />

            <Route
                path="/admin/reports"
                element={<AdminReports />}
            />

            <Route
                path="/admin/notifications"
                element={<AdminNotifications />}
            />

        </Routes>

    );
}

export default AppRoutes;