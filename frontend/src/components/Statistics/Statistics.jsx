import "./Statistics.css";

import {
  FaUsers,
  FaLeaf,
  FaRupeeSign,
  FaStar
} from "react-icons/fa";

function Statistics() {

  const stats = [
    {
      icon: <FaUsers />,
      number: "10,000+",
      title: "Registered Farmers"
    },
    {
      icon: <FaLeaf />,
      number: "25,000+",
      title: "Acres Managed"
    },
    {
      icon: <FaRupeeSign />,
      number: "₹50M+",
      title: "Crop Sales"
    },
    {
      icon: <FaStar />,
      number: "98%",
      title: "Farmer Satisfaction"
    }
  ];

  return (

    <section className="statistics">

      <div className="statistics-heading">

        <span>OUR IMPACT</span>

        <h2>Growing Agriculture with Technology</h2>

      </div>

      <div className="statistics-grid">

        {stats.map((item,index)=>(

          <div className="stat-box" key={index}>

            <div className="stat-icon">
              {item.icon}
            </div>

            <h2>{item.number}</h2>

            <p>{item.title}</p>

          </div>

        ))}

      </div>

    </section>

  );

}

export default Statistics;