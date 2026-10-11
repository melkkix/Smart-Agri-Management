import "./About.css";
import { FaSeedling, FaCloudSun, FaChartLine } from "react-icons/fa";

function About() {
  return (
    <section className="about" id="about">

      <div className="about-title">

        <span>ABOUT US</span>

        <h2>Empowering Farmers with Smart Technology</h2>

        <p>
          SmartAgri helps farmers manage crops, irrigation,
          weather forecasts, fertilizer recommendations,
          financial records, and market prices using one
          intelligent platform.
        </p>

      </div>

      <div className="about-cards">

        <div className="about-card">

          <FaSeedling className="about-icon"/>

          <h3>Crop Management</h3>

          <p>
            Manage all your crops digitally with complete records.
          </p>

        </div>

        <div className="about-card">

          <FaCloudSun className="about-icon"/>

          <h3>Weather Updates</h3>

          <p>
            Receive weather forecasts for better farming decisions.
          </p>

        </div>

        <div className="about-card">

          <FaChartLine className="about-icon"/>

          <h3>Market Prices</h3>

          <p>
            View real-time crop prices and maximize your profit.
          </p>

        </div>

      </div>

    </section>
  );
}

export default About;