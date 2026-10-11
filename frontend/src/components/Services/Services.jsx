import "./Services.css";

import {
  FaSeedling,
  FaCloudSun,
  FaTint,
  FaChartLine,
  FaMoneyBillWave,
  FaBell
} from "react-icons/fa";

function Services() {

  const services = [
    {
      icon: <FaSeedling />,
      title: "Crop Recommendation",
      desc: "AI-powered crop suggestions based on soil and season."
    },
    {
      icon: <FaTint />,
      title: "Smart Irrigation",
      desc: "Optimize water usage with intelligent irrigation planning."
    },
    {
      icon: <FaCloudSun />,
      title: "Weather Forecast",
      desc: "Live weather updates to improve farming decisions."
    },
    {
      icon: <FaChartLine />,
      title: "Market Price",
      desc: "View crop prices from nearby markets in real time."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Financial Management",
      desc: "Track income, expenses, and overall farm profit."
    },
    {
      icon: <FaBell />,
      title: "Reminder System",
      desc: "Never miss irrigation, fertilizer, or harvest schedules."
    }
  ];

  return (
    <section className="services" id="services">

      <div className="service-heading">

        <span>OUR SERVICES</span>

        <h2>Everything Farmers Need in One Platform</h2>

        <p>
          SmartAgri provides advanced digital tools to simplify
          modern farming and improve productivity.
        </p>

      </div>

      <div className="service-grid">

        {services.map((service, index) => (

          <div className="service-card" key={index}>

            <div className="service-icon">
              {service.icon}
            </div>

            <h3>{service.title}</h3>

            <p>{service.desc}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Services;