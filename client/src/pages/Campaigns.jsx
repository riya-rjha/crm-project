import React, { useEffect, useState } from "react";
import axios from "axios";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [expenditure, setExpenditure] = useState("");
  const [expenditureOp, setExpenditureOp] = useState("gt");
  const [visits, setVisits] = useState("");
  const [visitsOp, setVisitsOp] = useState("gt");
  const [activeDays, setActiveDays] = useState("");
  const [activeDaysOp, setActiveDaysOp] = useState("gt");
  const [op1, setOp1] = useState("AND");
  const [op2, setOp2] = useState("AND");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:3100/api/customer");
        setCustomers(res.data.allCustomers);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getCampaigns = async () => {
      const res = await axios.get("http://localhost:3100/api/campaign");
      //   console.log(res);
      setCampaigns(res.data.campaigns);
    };

    getCampaigns();
    getCustomers();
  }, []);

  const getQuery = (operator) => {
    if (operator == "$gt") {
      return " greater than ";
    } else if (operator == "$lt") {
      return " lesser than ";
    } else return " equal to ";
  };

  const getQueryLogic = (field, operator, value) => {
    if (operator == "gt") {
      return field > value;
    } else if (operator == "lt") {
      return field < value;
    }
    return field == value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let rules = [];

    if (expenditure !== null && expenditure !== undefined && expenditure != 0) {
      rules.push({
        field: "expenditure",
        operator: expenditureOp,
        value: Number(expenditure),
      });
    }

    if (activeDays !== null && activeDays !== undefined && activeDays != 0) {
      rules.push({
        field: "activeDays",
        operator: activeDaysOp,
        value: Number(activeDays),
      });
    }

    if (visits !== null && visits !== undefined && visits != 0) {
      rules.push({
        field: "visits",
        operator: visitsOp,
        value: Number(visits),
      });
    }

    console.log(rules);

    let filteredCustomers = [];
    let filteredCustomerIDs = [];

    customers.map((customer) => {
      rules.map((rule) => {
        if (rules.length == 1) {
          const isCheck = getQueryLogic(
            customer[rule.field],
            rule.operator,
            rule.value
          );
          if (isCheck) {
            filteredCustomerIDs.push(customer._id);
          }
        } else if (rules.length == 2) {
          //   Apply operator logic - 1 condition
        } else {
          //   Apply operator logic - 4 conditions
        }
      });
    });

    console.log(filteredCustomerIDs);

    let payload = {
      rules,
      operator1: op1,
      operator2: op2,
      message,
      filteredCustomerIDs,
    };
  };

  return (
    <div className="campaigns">
      <h2 className="segment-heading">Save a Segment?</h2>
      <div className="segments">
        <div className="segment-hz-row">
          <div className="segment-row">
            <label htmlFor="expenditure-label" className="label-text">
              Expenditure:
            </label>
            <input
              id="expenditure-label"
              type="number"
              className="input-value"
              placeholder="Value"
              value={expenditure}
              onChange={(e) => setExpenditure(e.target.value)}
            />
            <select
              className="select-condition"
              value={expenditureOp}
              onChange={(e) => {
                setExpenditureOp(e.target.value);
              }}
            >
              <option value="gt">Greater Than</option>
              <option value="lt">Less Than</option>
              <option value="eq">Equal To</option>
            </select>
          </div>
          <div className="logic-row">
            <select
              className="select-logic"
              value={op1}
              onChange={(e) => setOp1(e.target.value)}
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
        </div>

        <div className="segment-hz-row">
          <div className="segment-row">
            <label htmlFor="activedays-label" className="label-text">
              Active Days:
            </label>
            <input
              id="activedays-label"
              type="number"
              className="input-value"
              placeholder="Value"
              value={activeDays}
              onChange={(e) => setActiveDays(e.target.value)}
            />
            <select
              className="select-condition"
              value={activeDaysOp}
              onChange={(e) => {
                setActiveDaysOp(e.target.value);
              }}
            >
              <option value="gt">Greater Than</option>
              <option value="lt">Less Than</option>
              <option value="eq">Equal To</option>
            </select>
          </div>
          <div className="logic-row">
            <select
              className="select-logic"
              value={op2}
              onChange={(e) => setOp2(e.target.value)}
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
        </div>

        <div className="segment-hz-row">
          <div className="segment-row">
            <label htmlFor="visits-label" className="label-text">
              Visits:
            </label>
            <input
              id="visits-label"
              type="number"
              className="input-value"
              placeholder="Value"
              value={visits}
              onChange={(e) => setVisits(e.target.value)}
            />
            <select
              style={{
                minWidth: 0,
                width: "18rem",
              }}
              className="select-condition"
              value={visitsOp}
              onChange={(e) => {
                setVisitsOp(e.target.value);
              }}
            >
              <option value="gt">Greater Than</option>
              <option value="lt">Less Than</option>
              <option value="eq">Equal To</option>
            </select>
          </div>
        </div>
        <div className="message-submit-row">
          <label htmlFor="message-label" className="label-text">
            Message:
          </label>
          <input
            id="message-label"
            type="text"
            className="input-value"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={(e) => handleSubmit(e)} className="submit-btn">
            Submit
          </button>
        </div>
      </div>
      <div className="all-campaigns">
        <h1 className="campaign-heading">Campaigns</h1>
        <div className="campaign-grid">
          {campaigns.toReversed().map((campaign) => (
            <div className="campaign-card">
              <p>
                <span style={{ fontWeight: 600 }}>Created at: </span>{" "}
                {new Date(campaign.createdAt).toLocaleString()}
              </p>
              <p>
                <span style={{ fontWeight: 600 }}>Audience Size: </span>
                {campaign.customerIDs.length}
              </p>
              <p style={{ fontWeight: 600 }}>Rules: </p>
              <ul
                className="campaign-ul"
                style={{ listStyleType: "disc", paddingLeft: "20px" }}
              >
                {campaign.rules.map((rule, idx) => (
                  <li>
                    <span style={{ fontWeight: 600 }}>
                      {rule.field.charAt(0).toUpperCase() + rule.field.slice(1)}{" "}
                    </span>
                    {getQuery(rule.operator)} {rule.value}
                    {idx === 0 && campaign.rules.length > 1 ? (
                      <span> {campaign.operator1}</span>
                    ) : campaign.rules.length >= 3 ? (
                      <span> {campaign.operator2}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: ".3rem" }}>
                <span style={{ fontWeight: 600 }}>Message Sent: </span>{" "}
                {campaign.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
