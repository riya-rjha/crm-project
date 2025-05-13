import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
    </nav>
  );
};

export default Navbar;
