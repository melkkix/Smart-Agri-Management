import { useEffect, useState } from "react";
import "./Settings.css";

function Settings() {

    const [user, setUser] = useState(null);

    const [showProfile, setShowProfile] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [profileImage, setProfileImage] = useState(null);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [orderNotifications, setOrderNotifications] = useState(true);
    const [generalNotifications, setGeneralNotifications] = useState(true);


    // =========================================
    // LOAD USER
    // =========================================

    useEffect(() => {

        const userData =
            localStorage.getItem("smartAgriUser");

        if (userData) {

            try {

                const loggedUser =
                    JSON.parse(userData);

                setUser(loggedUser);

                setName(loggedUser.name || "");
                setEmail(loggedUser.email || "");

                setProfileImage(
                    loggedUser.profileImage ||
                    loggedUser.photo ||
                    loggedUser.image ||
                    loggedUser.profilePhoto ||
                    null
                );

            } catch (error) {

                console.log(
                    "Error loading user:",
                    error
                );

            }

        }


        const savedOrder =
            localStorage.getItem(
                "orderNotifications"
            );

        const savedGeneral =
            localStorage.getItem(
                "generalNotifications"
            );


        if (savedOrder !== null) {

            setOrderNotifications(
                savedOrder === "true"
            );

        }


        if (savedGeneral !== null) {

            setGeneralNotifications(
                savedGeneral === "true"
            );

        }

    }, []);


    // =========================================
    // OPEN PROFILE
    // =========================================

    const openProfile = () => {

        if (!user) {

            alert("Please login first.");

            return;

        }

        setName(user.name || "");
        setEmail(user.email || "");

        setProfileImage(
            user.profileImage ||
            user.photo ||
            user.image ||
            user.profilePhoto ||
            null
        );

        setShowProfile(true);

    };


    // =========================================
    // SELECT PHOTO
    // =========================================

    const handlePhotoChange = (event) => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }


        // Only image files

        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            return;

        }


        // Maximum 2 MB

        if (file.size > 2 * 1024 * 1024) {

            alert(
                "Please select an image smaller than 2 MB."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload = () => {

            setProfileImage(
                reader.result
            );

        };


        reader.readAsDataURL(file);

    };


    // =========================================
    // REMOVE PHOTO
    // =========================================

    const removePhoto = () => {

        setProfileImage(null);

    };


    // =========================================
    // SAVE PROFILE
    // =========================================

    const saveProfile = async () => {

        if (!user) {

            alert("Please login first.");

            return;

        }


        if (!name.trim()) {

            alert("Please enter your name.");

            return;

        }


        if (!email.trim()) {

            alert("Please enter your email.");

            return;

        }


        try {

            const response = await fetch(
                `http://localhost:8080/api/users/${user.id}/profile`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                   body: JSON.stringify({
    name: name.trim(),
    email: email.trim(),
    profileImage: profileImage
})
                }
            );


            const result =
                await response.text();


            if (!response.ok) {

                alert(
                    result ||
                    "Failed to update profile ❌"
                );

                return;

            }


            const updatedUser =
                JSON.parse(result);


            // Add profile image locally

            if (profileImage) {

                updatedUser.profileImage =
                    profileImage;

            } else {

                delete updatedUser.profileImage;

            }


            localStorage.setItem(
                "smartAgriUser",
                JSON.stringify(updatedUser)
            );


            setUser(updatedUser);


            alert(
                "Profile updated successfully ✅"
            );


            setShowProfile(false);

        } catch (error) {

            console.log(
                "Profile update error:",
                error
            );

            alert(
                "Backend connection error ❌"
            );

        }

    };


    // =========================================
    // OPEN PASSWORD
    // =========================================

    const openPassword = () => {

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setShowPassword(true);

    };


    // =========================================
    // CHANGE PASSWORD
    // =========================================

    const handlePasswordChange =
        async () => {

            if (!user) {

                alert("Please login first.");

                return;

            }


            if (!currentPassword) {

                alert(
                    "Please enter your current password."
                );

                return;

            }


            if (!newPassword) {

                alert(
                    "Please enter your new password."
                );

                return;

            }


            if (!confirmPassword) {

                alert(
                    "Please confirm your new password."
                );

                return;

            }


            if (newPassword.length < 6) {

                alert(
                    "New password must contain at least 6 characters."
                );

                return;

            }


            if (newPassword !== confirmPassword) {

                alert(
                    "New password and confirm password do not match."
                );

                return;

            }


            try {

                const response = await fetch(
                    `http://localhost:8080/api/users/${user.id}/password`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            currentPassword:
                                currentPassword,

                            newPassword:
                                newPassword,

                            confirmPassword:
                                confirmPassword

                        })
                    }
                );


                const result =
                    await response.text();


                if (!response.ok) {

                    alert(
                        result ||
                        "Failed to change password ❌"
                    );

                    return;

                }


                alert(
                    "Password changed successfully ✅"
                );


                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

                setShowPassword(false);

            } catch (error) {

                console.log(
                    "Password change error:",
                    error
                );

                alert(
                    "Backend connection error ❌"
                );

            }

        };


    // =========================================
    // NOTIFICATIONS
    // =========================================

    const openNotifications = () => {

        setShowNotifications(true);

    };


    const saveNotifications = () => {

        localStorage.setItem(
            "orderNotifications",
            orderNotifications
        );

        localStorage.setItem(
            "generalNotifications",
            generalNotifications
        );

        alert(
            "Notification settings saved successfully ✅"
        );

        setShowNotifications(false);

    };


    return (

        <div className="settings-page">

            <h1>⚙️ Settings</h1>

            <p>
                Manage your SmartAgri account settings.
            </p>


            {/* =================================
                ACCOUNT SETTINGS
            ================================= */}

            <div className="settings-card">

                <h2>
                    Account Settings
                </h2>


                <div className="settings-row">

                    <span>
                        Profile
                    </span>

                    <button
                        onClick={openProfile}
                    >
                        Edit
                    </button>

                </div>


                <div className="settings-row">

                    <span>
                        Password
                    </span>

                    <button
                        onClick={openPassword}
                    >
                        Change
                    </button>

                </div>


                <div className="settings-row">

                    <span>
                        Notifications
                    </span>

                    <button
                        onClick={openNotifications}
                    >
                        Manage
                    </button>

                </div>

            </div>


            {/* =================================
                PROFILE MODAL
            ================================= */}

            {showProfile && (

                <div
                    className="settings-overlay"
                    onClick={() =>
                        setShowProfile(false)
                    }
                >

                    <div
                        className="settings-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <h2>
                            👤 Edit Profile
                        </h2>

                        <p>
                            Update your SmartAgri profile information.
                        </p>


                        {/* PHOTO */}

                        <div className="profile-photo-section">

                            {profileImage ? (

                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="settings-profile-image"
                                />

                            ) : (

                                <div className="settings-profile-placeholder">

                                    👤

                                </div>

                            )}


                            <div className="photo-buttons">

                                <label className="choose-photo-btn">

                                    📷 Choose Photo

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={
                                            handlePhotoChange
                                        }
                                    />

                                </label>


                                {profileImage && (

                                    <button
                                        type="button"
                                        className="remove-photo-btn"
                                        onClick={
                                            removePhoto
                                        }
                                    >
                                        🗑️ Remove Photo
                                    </button>

                                )}

                            </div>

                        </div>


                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            placeholder="Enter your name"
                        />


                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                            placeholder="Enter your email"
                        />


                        <div className="modal-buttons">

                            <button
                                className="cancel-btn"
                                onClick={() =>
                                    setShowProfile(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="save-btn"
                                onClick={saveProfile}
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================
                PASSWORD MODAL
            ================================= */}

            {showPassword && (

                <div
                    className="settings-overlay"
                    onClick={() =>
                        setShowPassword(false)
                    }
                >

                    <div
                        className="settings-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <h2>
                            🔐 Change Password
                        </h2>

                        <p>
                            Change your SmartAgri account password.
                        </p>


                        <label>
                            Current Password
                        </label>

                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(event) =>
                                setCurrentPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Enter current password"
                        />


                        <label>
                            New Password
                        </label>

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(event) =>
                                setNewPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Enter new password"
                        />


                        <label>
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                            placeholder="Confirm new password"
                        />


                        <div className="modal-buttons">

                            <button
                                className="cancel-btn"
                                onClick={() =>
                                    setShowPassword(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="save-btn"
                                onClick={
                                    handlePasswordChange
                                }
                            >
                                Change Password
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================
                NOTIFICATION MODAL
            ================================= */}

            {showNotifications && (

                <div
                    className="settings-overlay"
                    onClick={() =>
                        setShowNotifications(false)
                    }
                >

                    <div
                        className="settings-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <h2>
                            🔔 Notification Settings
                        </h2>

                        <p>
                            Manage your SmartAgri notifications.
                        </p>


                        <div className="notification-row">

                            <div>

                                <strong>
                                    Order Notifications
                                </strong>

                                <small>
                                    Receive updates about your orders.
                                </small>

                            </div>

                            <label className="switch">

                                <input
                                    type="checkbox"
                                    checked={
                                        orderNotifications
                                    }
                                    onChange={(event) =>
                                        setOrderNotifications(
                                            event.target.checked
                                        )
                                    }
                                />

                                <span className="slider"></span>

                            </label>

                        </div>


                        <div className="notification-row">

                            <div>

                                <strong>
                                    General Notifications
                                </strong>

                                <small>
                                    Receive general SmartAgri updates.
                                </small>

                            </div>

                            <label className="switch">

                                <input
                                    type="checkbox"
                                    checked={
                                        generalNotifications
                                    }
                                    onChange={(event) =>
                                        setGeneralNotifications(
                                            event.target.checked
                                        )
                                    }
                                />

                                <span className="slider"></span>

                            </label>

                        </div>


                        <div className="modal-buttons">

                            <button
                                className="cancel-btn"
                                onClick={() =>
                                    setShowNotifications(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                className="save-btn"
                                onClick={
                                    saveNotifications
                                }
                            >
                                Save Settings
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}

export default Settings;