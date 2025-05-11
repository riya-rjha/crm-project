import React, { useEffect, useState } from "react";
import axios from "axios";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const getCampaigns = async () => {
      const res = await axios.get("http://localhost:3100/api/campaign");
      console.log(res);
      setCampaigns(res.data.campaigns);
    };
    getCampaigns();
  }, []);

  const getQuery = (operator) => {
    if (operator == "$gt") {
      return " greater than ";
    } else if (operator == "$lt") {
      return " lesser than ";
    } else return " equal to ";
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
            />
            <select className="select-condition">
              <option value=">">Greater Than</option>
              <option value="<">Less Than</option>
              <option value="=">Equal To</option>
            </select>
          </div>
          <div className="logic-row">
            <select className="select-logic">
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
            />
            <select className="select-condition">
              <option value=">">Greater Than</option>
              <option value="<">Less Than</option>
              <option value="=">Equal To</option>
            </select>
          </div>
          <div className="logic-row">
            <select className="select-logic">
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
            />
            <select className="select-condition">
              <option value=">">Greater Than</option>
              <option value="<">Less Than</option>
              <option value="=">Equal To</option>
            </select>
          </div>
          <button className="submit-btn">Submit</button>
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
