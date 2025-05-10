import React from "react";

const App = () => {
  return (
    <div>
      <div className="landing-page">
        <nav>
          <div className="left">
            <p id="tag">CRM</p>
            <div className="tags">
              <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Pricing</li>
                <li>Features</li>
              </ul>
            </div>
          </div>
          <div className="right">
            <button>Signup</button>
          </div>
        </nav>

        <div className="hero">
          <div className="left-hero">
            <h1>
              Presenting The Next-Gen <span>CRM Platform</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              laborum eveniet sunt similique ea nam consequuntur praesentium.
              Necessitatibus, sunt labore?
            </p>
            <button>Authenticate</button>
          </div>
          <div className="right-hero">
            <img
              src="https://plus.unsplash.com/premium_photo-1683865775631-3283bfaf6508?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VzdG9tZXJ8ZW58MHx8MHx8fDA%3D"
              alt=""
              width={400}
            />
          </div>
        </div>

        <div className="stats">
          <div className="customers">
            <div className="data">
              <h1>200+</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Exercitationem, tenetur.
              </p>
            </div>
          </div>
          <div className="campaigns">
            <div className="data">
              <h1>200+</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Exercitationem, tenetur.
              </p>
            </div>
          </div>
          <div className="segments">
            <div className="data">
              <h1>40+</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Exercitationem, tenetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
