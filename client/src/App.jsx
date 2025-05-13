import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Navbar from "./components/Navbar";
import Campaigns from "./pages/Campaigns";
import Statistics from "./pages/Statistics";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { user, loginWithRedirect, isAuthenticated, logout, isLoading } =
    useAuth0();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isLoading) return; // Prevent premature execution

    if (isAuthenticated && user) {
      const name = user.name;
      setUsername(name);
      localStorage.setItem("username", name);
    } else {
      setUsername("");
      localStorage.removeItem("username");
    }
  }, [isAuthenticated, user, isLoading]);

  if (isLoading) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading current page...
      </p>
    );
  }

  return (
    <div>
      <div className="landing-page">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="hero">
                  <div className="left-hero">
                    <h1>
                      Presenting The Next-Gen{" "}
                      <span style={{ textDecoration: "underline" }}>
                        CRM Platform
                      </span>
                    </h1>
                    <div>
                      <p>
                        A smart and scalable customer engagement tool designed
                        to help your business grow, connect, and convert
                        effortlessly. Streamline interactions, foster meaningful
                        relationships, and drive conversions with personalized,
                        data-driven strategies.
                      </p>
                    </div>
                    {isAuthenticated ? (
                      <button
                        onClick={() => {
                          logout();
                          localStorage.removeItem("username");
                        }}
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          loginWithRedirect();
                          window.location.reload();
                          location.setItem("username", username);
                        }}
                      >
                        Authenticate
                      </button>
                    )}
                  </div>
                  <div className="right-hero">
                    <img
                      src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3VzdG9tZXJzfGVufDB8fDB8fHww"
                      alt=""
                      width={400}
                    />
                  </div>
                </div>

                <div className="features">
                  <h2>Platform Features</h2>
                  <div className="features-list">
                    <div className="feature-card">
                      <h3>Customer Segmentation</h3>
                      <p>
                        Tailor your marketing strategies with precise customer
                        grouping.
                      </p>
                    </div>
                    <div className="feature-card">
                      <h3>Automated Campaigns</h3>
                      <p>
                        Schedule and run automated campaigns that drive
                        engagement.
                      </p>
                    </div>
                    <div className="feature-card">
                      <h3>Real-time Analytics</h3>
                      <p>
                        Get insights on user behavior and campaign performance
                        instantly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="features">
                  <h2>Customer Insights</h2>
                  <div className="features-list">
                    <div className="feature-card">
                      <h3 style={{ fontSize: "3rem" }}>200+</h3>
                      <p>
                        Happy Customers using our CRM to grow their businesses
                        effectively.
                      </p>
                    </div>
                    <div className="feature-card">
                      <h3 style={{ fontSize: "3rem" }}>300+</h3>
                      <p>
                        Marketing Campaigns created with measurable results and
                        impact.
                      </p>
                    </div>
                    <div className="feature-card">
                      <h3 style={{ fontSize: "3rem" }}>40+</h3>
                      <p>
                        Customer Segments tailored for precise targeting and
                        conversion.
                      </p>
                    </div>
                  </div>
                </div>
                <footer className="footer">
                  &copy; 2025 CRM (Customer relationship Management)
                </footer>
              </>
            }
          />
          <Route path="/customers" element={<Customers />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/stats" element={<Statistics />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
