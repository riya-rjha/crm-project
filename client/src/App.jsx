import React from "react";

const App = () => {
  return (
    <div>
      <div className="landing-page">
        <nav>
          <div className="left">
            <p id="tag">Xeno</p>
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
            <h1>Presenting The Next-Gen CRM Platform</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              laborum eveniet sunt similique ea nam consequuntur praesentium.
              Necessitatibus, sunt labore?
            </p>
            <button>Authenticate</button>
          </div>
          <div className="right-hero">
            <img src="" alt="" width={400} />
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
