import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  return (
    <nav>
      <div className="left">
        <p id="tag">
          <Link to="/" style={{ textDecoration: "none", color: "#00009b" }}>
            CRM
          </Link>
        </p>
        <div className="tags">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="/campaigns">Campaigns</Link>
            </li>
            <li>
              <Link to="/stats">Statistics</Link>
            </li>
          </ul>
        </div>
      </div>

      {username && (
        <div className="right">
          <p style={{ fontWeight: "600", marginRight: "1rem" }}>
            Welcome, {username.split(" ")[0]}
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
