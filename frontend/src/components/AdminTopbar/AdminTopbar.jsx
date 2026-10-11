import "./AdminTopbar.css";
import { FaBell } from "react-icons/fa";

function AdminTopbar() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="admin-topbar">

      <div className="admin-topbar-left">

        <h2>
          👨‍💼 Admin Panel
        </h2>

        <p>
          {today}
        </p>

      </div>


      <div className="admin-topbar-right">

        <button className="admin-notification-btn">
          <FaBell />
        </button>


        <div className="admin-profile">

          <div className="admin-profile-icon">
            👨‍💼
          </div>

          <div className="admin-profile-info">

            <h4>
              Admin
            </h4>

            <p>
              SmartAgri Administrator
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminTopbar;