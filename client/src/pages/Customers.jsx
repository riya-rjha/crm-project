import React, { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [expenditure, setExpenditure] = useState(0);
  const [visits, setVisits] = useState(0);
  const [activeDays, setActiveDays] = useState(0);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:3100/api/customer");
        setCustomers(res.data.allCustomers);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCustomers();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3100/api/customer", {
        name,
        expenditure,
        visits,
        activeDays,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="customer">
      <form action="">
        <label htmlFor="name" id="name">
          Name:{" "}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="expenditure" id="expenditure">
          Expenditure:{" "}
        </label>
        <input
          type="number"
          value={expenditure}
          onChange={(e) => setExpenditure(e.target.value)}
        />
        <label htmlFor="active" id="active">
          Active Days:{" "}
        </label>
        <input
          type="number"
          value={activeDays}
          onChange={(e) => setActiveDays(e.target.value)}
        />
        <label htmlFor="visits" id="visits">
          Visits:{" "}
        </label>
        <input
          type="number"
          value={visits}
          onChange={(e) => setVisits(e.target.value)}
        />
        <button onClick={handleSubmit} className="customer-submit">
          Submit
        </button>
      </form>
      <h2 className="customer-heading">Customers</h2>
      <div className="customer-grid">
        {customers.map((customer) => (
          <div className="card">
            <h3 className="customer-name">{customer.name}</h3>
            <p>
              <span style={{ fontWeight: 600 }}>Expenditure: </span>
              {customer.expenditure}
            </p>
            <p>
              <span style={{ fontWeight: 600 }}>Active Days: </span>
              {customer.activeDays}
            </p>
            <p>
              <span style={{ fontWeight: 600 }}>Visits: </span>
              {customer.visits}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
