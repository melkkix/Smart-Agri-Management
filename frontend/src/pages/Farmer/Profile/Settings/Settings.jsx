import { useState } from "react";
import "./Settings.css";

function Settings() {

    const [notifications, setNotifications] = useState(true);
    const [weatherAlerts, setWeatherAlerts] = useState(true);
    const [marketAlerts, setMarketAlerts] = useState(true);

    const saveSettings = () => {
        alert("Settings saved successfully ✅");
    };

    return (
        <div className="settings-page">

            <div className="settings-header">
                <h1>⚙️ Settings</h1>
                <p>Manage your SmartAgri preferences.</p>
            </div>

            <div className="settings-card">

                <h2>🔔 Notification Settings</h2>

                <div className="setting-row">
                    <div>
                        <h3>Notifications</h3>
                        <p>Receive important farm notifications.</p>
                    </div>

                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={notifications}
                            onChange={(e) =>
                                setNotifications(e.target.checked)
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>


                <div className="setting-row">
                    <div>
                        <h3>Weather Alerts</h3>
                        <p>Get alerts about weather conditions.</p>
                    </div>

                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={weatherAlerts}
                            onChange={(e) =>
                                setWeatherAlerts(e.target.checked)
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>


                <div className="setting-row">
                    <div>
                        <h3>Market Price Alerts</h3>
                        <p>Receive updates about crop market prices.</p>
                    </div>

                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={marketAlerts}
                            onChange={(e) =>
                                setMarketAlerts(e.target.checked)
                            }
                        />
                        <span className="slider"></span>
                    </label>
                </div>

            </div>


            <div className="settings-card">

                <h2>🌾 Farm Preferences</h2>

                <div className="setting-input">

                    <label>Preferred Crop</label>

                    <select>
                        <option>Paddy</option>
                        <option>Sugarcane</option>
                        <option>Banana</option>
                        <option>Tomato</option>
                        <option>Maize</option>
                        <option>Cotton</option>
                    </select>

                </div>


                <div className="setting-input">

                    <label>Area Unit</label>

                    <select>
                        <option>Acres</option>
                        <option>Hectares</option>
                    </select>

                </div>

            </div>


            <button
                className="save-settings-btn"
                onClick={saveSettings}
            >
                💾 Save Settings
            </button>

        </div>
    );
}

export default Settings;