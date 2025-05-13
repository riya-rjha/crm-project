import React, { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [expenditure, setExpenditure] = useState();
  const [visits, setVisits] = useState();
  const [activeDays, setActiveDays] = useState();

  const username = localStorage.getItem("username");

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/customer`);
        setCustomers(res.data.allCustomers);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCustomers();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/customer`, {
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
      {username == null || username == "" ? (
        <p>
          You aren't logged in yet. Go to the Home page and authenticate with
          your google account to be accepted as a manager & create your
          campaigns!
        </p>
      ) : (
        <>
          <form action="">
            <label htmlFor="name">Name: </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="expenditure">Expenditure: </label>
            <input
              placeholder="Enter expenditure"
              type="number"
              id="expenditure"
              value={expenditure}
              onChange={(e) => setExpenditure(e.target.value)}
            />
            <label htmlFor="active">Active Days: </label>
            <input
              id="active"
              placeholder="Enter active days"
              type="number"
              value={activeDays}
              onChange={(e) => setActiveDays(e.target.value)}
            />
            <label htmlFor="visits">Visits: </label>
            <input
              id="visits"
              placeholder="Enter visits"
              type="number"
              value={visits}
              onChange={(e) => setVisits(e.target.value)}
            />
            <button onClick={handleSubmit} className="customer-submit">
              Add
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
        </>
      )}
    </div>
  );
};

export default Customers;
