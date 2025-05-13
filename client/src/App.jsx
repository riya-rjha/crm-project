import React from "react";
import { Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Navbar from "./components/Navbar";
import Campaigns from "./pages/Campaigns";
import Statistics from "./pages/Statistics";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const App = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const [username, setUsername] = useState("");

  // console.log(user)

  useEffect(() => {
    if (isAuthenticated && user) {
      const name = user.name;
      setUsername(name);
      localStorage.setItem("username", name);
    } else {
      setUsername("");
      localStorage.removeItem("username");
    }
  }, [isAuthenticated, user]);

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
                      Presenting The Next-Gen <span>CRM Platform</span>
                    </h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Totam laborum eveniet sunt similique ea nam consequuntur
                      praesentium. Necessitatibus, sunt labore?
                    </p>
                    {isAuthenticated ? (
                      <button onClick={() => logout()}>Logout</button>
                    ) : (
                      <button onClick={() => loginWithRedirect()}>
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

                <div className="stats-home">
                  <div className="customers">
                    <div className="data">
                      <h1>200+</h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Exercitationem, tenetur.
                      </p>
                    </div>
                  </div>
                  <div className="campaigns">
                    <div className="data">
                      <h1>200+</h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Exercitationem, tenetur.
                      </p>
                    </div>
                  </div>
                  <div className="segments-home">
                    <div className="data">
                      <h1>40+</h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Exercitationem, tenetur.
                      </p>
                    </div>
                  </div>
                </div>
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
