import "./AddFarm.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { FarmContext } from "../../../context/FarmContext";

function AddFarm() {

  const navigate = useNavigate();
  const location = useLocation();

  const { addFarm, updateFarm } = useContext(FarmContext);

  const editFarm = location.state?.farm;

  const [farm, setFarm] = useState({
    id: "",
    farmName: "",
    location: "",
    farmSize: "",
    cropType: "",
    soilType: "",
    waterSource: "",
    description: ""
  });

  useEffect(() => {
    if (editFarm) {
      setFarm(editFarm);
    }
  }, [editFarm]);

  const handleChange = (e) => {
    setFarm({
      ...farm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !farm.farmName ||
      !farm.location ||
      !farm.farmSize ||
      !farm.cropType
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (editFarm) {
      updateFarm(farm);
      alert("Farm Updated Successfully ✅");
    } else {
      addFarm(farm);
      alert("Farm Added Successfully ✅");
    }

    navigate("/farmer/farm-management");
  };

  return (
    <div className="add-farm-page">

      <div className="add-farm-card">

        <h1>
          {editFarm ? "✏️ Edit Farm" : "🌾 Add New Farm"}
        </h1>

        <p>
          {editFarm
            ? "Update your farm details."
            : "Enter your farm information below."}
        </p>

        <form className="farm-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Farm Name</label>
            <input
              type="text"
              name="farmName"
              value={farm.farmName}
              onChange={handleChange}
              placeholder="Enter farm name"
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={farm.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </div>

          <div className="form-group">
            <label>Farm Size</label>
            <input
              type="text"
              name="farmSize"
              value={farm.farmSize}
              onChange={handleChange}
              placeholder="Ex: 5 Acres"
            />
          </div>

          <div className="form-group">
            <label>Crop Type</label>

            <select
              name="cropType"
              value={farm.cropType}
              onChange={handleChange}
            >
              <option value="">Select Crop</option>
              <option>Paddy</option>
              <option>Sugarcane</option>
              <option>Banana</option>
              <option>Tomato</option>
              <option>Maize</option>
              <option>Cotton</option>
            </select>

          </div>

          <div className="form-group">
            <label>Soil Type</label>

            <select
              name="soilType"
              value={farm.soilType}
              onChange={handleChange}
            >
              <option value="">Select Soil</option>
              <option>Black Soil</option>
              <option>Red Soil</option>
              <option>Clay Soil</option>
              <option>Sandy Soil</option>
            </select>

          </div>

          <div className="form-group">
            <label>Water Source</label>

            <select
              name="waterSource"
              value={farm.waterSource}
              onChange={handleChange}
            >
              <option value="">Select Water Source</option>
              <option>Borewell</option>
              <option>River</option>
              <option>Canal</option>
              <option>Rain Water</option>
              <option>Pond</option>
            </select>

          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              value={farm.description}
              onChange={handleChange}
              placeholder="Enter farm description"
            />

          </div>

          <div className="form-group">
            <label>Upload Farm Image</label>
            <input type="file" />
          </div>

          <div className="button-group">

            <button
              type="submit"
              className="save-btn"
            >
              {editFarm ? "Update Farm" : "Save Farm"}
            </button>

            <Link to="/farmer/farm-management">
              <button
                type="button"
                className="cancel-btn"
              >
                Cancel
              </button>
            </Link>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddFarm;