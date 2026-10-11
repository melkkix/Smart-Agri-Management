import "./Features.css";

import {
  FaLeaf,
  FaTint,
  FaCloudSun,
  FaChartLine,
  FaMoneyBillWave,
  FaUsers
} from "react-icons/fa";

function Features() {

  const features = [
    {
      icon: <FaLeaf />,
      title: "AI Crop Recommendation",
      description: "Recommend suitable crops based on soil type, season, and climate."
    },
    {
      icon: <FaTint />,
      title: "Smart Irrigation",
      description: "Optimize water usage with intelligent irrigation scheduling."
    },
    {
      icon: <FaCloudSun />,
      title: "Weather Forecast",
      description: "Access live weather updates and rainfall predictions."
    },
    {
      icon: <FaChartLine />,
      title: "Market Analytics",
      description: "Track crop prices and identify the best selling opportunities."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Financial Management",
      description: "Monitor farm income, expenses, and overall profitability."
    },
    {
      icon: <FaUsers />,
      title: "Buyer Marketplace",
      description: "Connect farmers directly with buyers for better business."
    }
  ];

  return (

    <section className="features" id="features">

      <div className="feature-title">

        <span>FEATURES</span>

        <h2>Why Choose SmartAgri?</h2>

        <p>
          SmartAgri combines modern technology with agriculture to help
          farmers increase productivity and make better decisions.
        </p>

      </div>

      <div className="feature-container">

        {features.map((feature, index) => (

          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default Features;