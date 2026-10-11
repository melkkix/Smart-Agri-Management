import { useEffect, useState } from "react";
import BuyerSidebar from "../../../components/BuyerSidebar/BuyerSidebar";
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

    useEffect(() => {
        const userData = localStorage.getItem("smartAgriUser");

        if (!userData) {
            return;
        }

        try {
            const loggedUser = JSON.parse(userData);

            setUser(loggedUser);
            setName(loggedUser.name || "");
            setEmail(loggedUser.email || "");
            setProfileImage(loggedUser.profileImage || null);

            const savedOrderNotifications =
                localStorage.getItem(`buyerOrderNotifications_${loggedUser.id}`);

            const savedGeneralNotifications =
                localStorage.getItem(`buyerGeneralNotifications_${loggedUser.id}`);

            if (savedOrderNotifications !== null) {
                setOrderNotifications(savedOrderNotifications === "true");
            }

            if (savedGeneralNotifications !== null) {
                setGeneralNotifications(savedGeneralNotifications === "true");
            }
        } catch (error) {
            console.error("Error loading buyer settings:", error);
        }
    }, []);

    // =========================
    // PROFILE PHOTO
    // =========================

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Image size should be less than 2 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setProfileImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const removePhoto = () => {
        setProfileImage(null);
    };

    // =========================
    // SAVE PROFILE
    // =========================

    const saveProfile = async () => {
        if (!user || !user.id) {
            alert("User information not found.");
            return;
        }

        if (!name.trim()) {
            alert("Name cannot be empty.");
            return;
        }

        if (!email.trim()) {
            alert("Email cannot be empty.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/users/${user.id}/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        email: email.trim(),
                        profileImage: profileImage,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const updatedUser = await response.json();

            const finalUser = {
                ...user,
                ...updatedUser,
                name: updatedUser.name || name.trim(),
                email: updatedUser.email || email.trim(),
                profileImage:
                    updatedUser.profileImage !== undefined
                        ? updatedUser.profileImage
                        : profileImage,
            };

            localStorage.setItem(
                "smartAgriUser",
                JSON.stringify(finalUser)
            );

            setUser(finalUser);

            alert("Profile updated successfully.");
            setShowProfile(false);

            window.dispatchEvent(new Event("userProfileUpdated"));
        } catch (error) {
            console.error("Profile update error:", error);

            alert(
                "Unable to update profile. Please make sure the backend is running."
            );
        }
    };

    // =========================
    // CHANGE PASSWORD
    // =========================

    const changePassword = async () => {
        if (!user || !user.id) {
            alert("User information not found.");
            return;
        }

        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("Please fill all password fields.");
            return;
        }

        if (newPassword.length < 6) {
            alert("New password must contain at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/users/${user.id}/password`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                        confirmPassword: confirmPassword,
                    }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Password update failed");
            }

            alert("Password changed successfully.");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setShowPassword(false);
        } catch (error) {
            console.error("Password change error:", error);

            alert(
                error.message ||
                    "Unable to change password. Please try again."
            );
        }
    };

    // =========================
    // SAVE NOTIFICATIONS
    // =========================

    const saveNotifications = () => {
        if (!user || !user.id) {
            return;
        }

        localStorage.setItem(
            `buyerOrderNotifications_${user.id}`,
            String(orderNotifications)
        );

        localStorage.setItem(
            `buyerGeneralNotifications_${user.id}`,
            String(generalNotifications)
        );

        alert("Notification settings saved successfully.");

        setShowNotifications(false);
    };

    // =========================
    // RESET PASSWORD MODAL
    // =========================

    const closePasswordModal = () => {
        setShowPassword(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    if (!user) {
        return (
            <div className="buyer-settings-layout">
                <BuyerSidebar />

                <main className="buyer-settings-content">
                    <div className="settings-loading">
                        Loading settings...
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="buyer-settings-layout">

            <BuyerSidebar />

            <main className="buyer-settings-content">

                {/* ========================= */}
                {/* HEADER */}
                {/* ========================= */}

                <div className="settings-header">

                    <div>
                        <h1>⚙️ Account Settings</h1>

                        <p>
                            Manage your profile, password and notification
                            preferences.
                        </p>
                    </div>

                </div>

                {/* ========================= */}
                {/* SETTINGS CARD */}
                {/* ========================= */}

                <div className="settings-card">

                    <div className="settings-card-title">
                        <h2>Account Settings</h2>
                        <p>
                            Update your SmartAgri buyer account information.
                        </p>
                    </div>

                    {/* PROFILE */}

                    <div className="settings-row">

                        <div className="settings-row-icon profile-icon">
                            👤
                        </div>

                        <div className="settings-row-info">
                            <h3>Profile</h3>
                            <p>
                                Update your name, email and profile photo.
                            </p>
                        </div>

                        <button
                            className="settings-action-button"
                            onClick={() => setShowProfile(true)}
                        >
                            Edit
                        </button>

                    </div>

                    {/* PASSWORD */}

                    <div className="settings-row">

                        <div className="settings-row-icon password-icon">
                            🔐
                        </div>

                        <div className="settings-row-info">
                            <h3>Password</h3>
                            <p>
                                Change your account password securely.
                            </p>
                        </div>

                        <button
                            className="settings-action-button"
                            onClick={() => setShowPassword(true)}
                        >
                            Change
                        </button>

                    </div>

                    {/* NOTIFICATIONS */}

                    <div className="settings-row">

                        <div className="settings-row-icon notification-icon">
                            🔔
                        </div>

                        <div className="settings-row-info">
                            <h3>Notifications</h3>
                            <p>
                                Manage your order and general notifications.
                            </p>
                        </div>

                        <button
                            className="settings-action-button"
                            onClick={() => setShowNotifications(true)}
                        >
                            Manage
                        </button>

                    </div>

                </div>

                {/* ========================= */}
                {/* PROFILE MODAL */}
                {/* ========================= */}

                {showProfile && (
                    <div
                        className="settings-modal-overlay"
                        onClick={() => setShowProfile(false)}
                    >

                        <div
                            className="settings-modal"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >

                            <div className="modal-header">
                                <div>
                                    <h2>Edit Profile</h2>
                                    <p>
                                        Update your buyer profile information.
                                    </p>
                                </div>

                                <button
                                    className="modal-close"
                                    onClick={() =>
                                        setShowProfile(false)
                                    }
                                >
                                    ×
                                </button>
                            </div>

                            <div className="profile-photo-section">

                                <div className="profile-photo-wrapper">

                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="profile-photo"
                                        />
                                    ) : (
                                        <div className="profile-photo-placeholder">
                                            👤
                                        </div>
                                    )}

                                </div>

                                <div className="photo-buttons">

                                    <label className="choose-photo-button">
                                        Choose Photo

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            hidden
                                        />
                                    </label>

                                    {profileImage && (
                                        <button
                                            type="button"
                                            className="remove-photo-button"
                                            onClick={removePhoto}
                                        >
                                            Remove Photo
                                        </button>
                                    )}

                                </div>

                                <p className="photo-note">
                                    JPG, PNG or other image files. Maximum
                                    size: 2 MB.
                                </p>

                            </div>

                            <div className="form-group">

                                <label>Full Name</label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    placeholder="Enter your name"
                                />

                            </div>

                            <div className="form-group">

                                <label>Email</label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="Enter your email"
                                />

                            </div>

                            <div className="modal-actions">

                                <button
                                    className="cancel-button"
                                    onClick={() =>
                                        setShowProfile(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="save-button"
                                    onClick={saveProfile}
                                >
                                    Save Changes
                                </button>

                            </div>

                        </div>

                    </div>
                )}

                {/* ========================= */}
                {/* PASSWORD MODAL */}
                {/* ========================= */}

                {showPassword && (
                    <div
                        className="settings-modal-overlay"
                        onClick={closePasswordModal}
                    >

                        <div
                            className="settings-modal"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >

                            <div className="modal-header">

                                <div>
                                    <h2>Change Password</h2>

                                    <p>
                                        Create a new password for your
                                        account.
                                    </p>
                                </div>

                                <button
                                    className="modal-close"
                                    onClick={closePasswordModal}
                                >
                                    ×
                                </button>

                            </div>

                            <div className="form-group">

                                <label>Current Password</label>

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

                            </div>

                            <div className="form-group">

                                <label>New Password</label>

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

                            </div>

                            <div className="form-group">

                                <label>Confirm New Password</label>

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

                            </div>

                            <p className="password-note">
                                Password must contain at least 6 characters.
                            </p>

                            <div className="modal-actions">

                                <button
                                    className="cancel-button"
                                    onClick={closePasswordModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="save-button"
                                    onClick={changePassword}
                                >
                                    Change Password
                                </button>

                            </div>

                        </div>

                    </div>
                )}

                {/* ========================= */}
                {/* NOTIFICATION MODAL */}
                {/* ========================= */}

                {showNotifications && (
                    <div
                        className="settings-modal-overlay"
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

                            <div className="modal-header">

                                <div>
                                    <h2>Notification Settings</h2>

                                    <p>
                                        Choose which notifications you
                                        want to receive.
                                    </p>
                                </div>

                                <button
                                    className="modal-close"
                                    onClick={() =>
                                        setShowNotifications(false)
                                    }
                                >
                                    ×
                                </button>

                            </div>

                            <div className="notification-setting">

                                <div>
                                    <h3>Order Notifications</h3>

                                    <p>
                                        Receive notifications about your
                                        orders and delivery status.
                                    </p>
                                </div>

                                <label className="switch">

                                    <input
                                        type="checkbox"
                                        checked={orderNotifications}
                                        onChange={(event) =>
                                            setOrderNotifications(
                                                event.target.checked
                                            )
                                        }
                                    />

                                    <span className="slider"></span>

                                </label>

                            </div>

                            <div className="notification-setting">

                                <div>
                                    <h3>General Notifications</h3>

                                    <p>
                                        Receive general SmartAgri updates
                                        and notifications.
                                    </p>
                                </div>

                                <label className="switch">

                                    <input
                                        type="checkbox"
                                        checked={generalNotifications}
                                        onChange={(event) =>
                                            setGeneralNotifications(
                                                event.target.checked
                                            )
                                        }
                                    />

                                    <span className="slider"></span>

                                </label>

                            </div>

                            <div className="modal-actions">

                                <button
                                    className="cancel-button"
                                    onClick={() =>
                                        setShowNotifications(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="save-button"
                                    onClick={saveNotifications}
                                >
                                    Save Settings
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </main>

        </div>
    );
}

export default Settings;