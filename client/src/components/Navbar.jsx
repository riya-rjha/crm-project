import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="left">
        <p id="tag">CRM</p>
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
              <Link to="/segments">Segments</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="right">
        <Link to="/auth">
          <button>Signup</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
