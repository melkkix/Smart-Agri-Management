import "./Hero.css";
import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="hero-tag">
          🌱 Smart Farming Platform
        </span>

        <h1>
          Smart Agriculture
          <br />
          Management
          <br />
          System
        </h1>

        <p>
          Manage your farms digitally with crop recommendation,
          smart irrigation, fertilizer guidance, weather forecast,
          market prices, financial management and buyer marketplace
          in one modern platform.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Get Started
            <FaArrowRight />
          </button>

          <button className="secondary-btn">
            Learn More
          </button>

        </div>

      </div>

      <div className="hero-right">

        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900"
          alt="Farmer"
        />

      </div>

    </section>
  );
}

export default Hero;