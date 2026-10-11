import "./FarmManagement.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FarmContext } from "../../../context/FarmContext";

function FarmManagement() {

  const navigate = useNavigate();

  const { farms, deleteFarm } = useContext(FarmContext);

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this farm?"
    );

    if (confirmDelete) {
      deleteFarm(id);
    }
  };

  const handleEdit = (farm) => {
    navigate("/farmer/add-farm", {
      state: { farm }
    });
  };

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-content">

        <Topbar />

        <div className="farm-management">

          <div className="farm-header">

            <div>
              <h1>🌾 Farm Management</h1>
              <p>Manage all your farms in one place.</p>
            </div>

            <Link to="/farmer/add-farm">
              <button className="add-farm-btn">
                + Add Farm
              </button>
            </Link>

          </div>

          <div className="farm-table">

            <table>

              <thead>

                <tr>
                  <th>Farm Name</th>
                  <th>Location</th>
                  <th>Crop</th>
                  <th>Area</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {farms.map((farm) => (

                  <tr key={farm.id}>

                    <td>{farm.farmName}</td>

                    <td>{farm.location}</td>

                    <td>{farm.cropType}</td>

                    <td>{farm.farmSize}</td>

                    <td>
                      <span className="active">
                        {farm.status}
                      </span>
                    </td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(farm)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(farm.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FarmManagement;