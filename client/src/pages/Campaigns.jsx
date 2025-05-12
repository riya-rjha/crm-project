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
  const [previewSize, setPreviewSize] = useState();
  const [showPopup, setShowPopup] = useState(false);

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
    if (operator == "gt") {
      return " greater than ";
    } else if (operator == "lt") {
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

  const calculateRules = (rules) => {
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

    // console.log(rules);
  };

  const calculateFilteredCustomers = (
    rules,
    filteredCustomerIDs,
    filteredCustomers
  ) => {
    calculateRules(rules);

    customers.map((customer) => {
      if (rules.length == 1) {
        let isCheck;
        rules.map((rule) => {
          isCheck = getQueryLogic(
            customer[rule.field],
            rule.operator,
            rule.value
          );
        });
        if (isCheck) {
          filteredCustomerIDs.push(customer._id);
          filteredCustomers.push(customer.name);
        }
      } else if (rules.length == 2) {
        //   Apply operator logic - 1 condition
        const [rule1, rule2] = rules;
        const isCheckFirst = getQueryLogic(
          customer[rule1.field],
          rule1.operator,
          rule1.value
        );
        const isCheckSecond = getQueryLogic(
          customer[rule2.field],
          rule2.operator,
          rule2.value
        );
        const isCheck =
          op1 === "AND"
            ? isCheckFirst && isCheckSecond
            : isCheckFirst || isCheckSecond;
        if (isCheck) {
          filteredCustomerIDs.push(customer._id);
          filteredCustomers.push(customer.name);
        }
      } else if (rules.length == 3) {
        //   Apply operator logic - 4 conditions
        const [rule1, rule2, rule3] = rules;

        const isCheckFirst = getQueryLogic(
          customer[rule1.field],
          rule1.operator,
          rule1.value
        );
        const isCheckSecond = getQueryLogic(
          customer[rule2.field],
          rule2.operator,
          rule2.value
        );
        const isCheckThird = getQueryLogic(
          customer[rule3.field],
          rule3.operator,
          rule3.value
        );

        let isCheck;
        if (op1 === "AND" && op2 === "AND") {
          isCheck = isCheckFirst && isCheckSecond && isCheckThird;
        } else if (op1 === "AND" && op2 === "OR") {
          isCheck = (isCheckFirst && isCheckSecond) || isCheckThird;
        } else if (op1 === "OR" && op2 === "AND") {
          isCheck = isCheckFirst || (isCheckSecond && isCheckThird);
        } else {
          isCheck = isCheckFirst || isCheckSecond || isCheckThird;
        }

        if (isCheck) {
          filteredCustomerIDs.push(customer._id);
          filteredCustomers.push(customer.name);
        }
      } else {
        filteredCustomerIDs.push(customer._id);
      }
    });
  };

  const handleSubmit = async () => {
    let filteredCustomerIDs = [];
    let filteredCustomers = [];
    let rules = [];

    calculateFilteredCustomers(rules, filteredCustomerIDs, filteredCustomers);

    // console.log(filteredCustomerIDs);
    // console.log(filteredCustomers);
    // console.log(rules);

    // console.log(filteredCustomerIDs.length);
    let size = filteredCustomerIDs.length;
    setPreviewSize(size);

    let payload = {
      rules,
      operator1: op1,
      operator2: op2,
      message,
      customerIDs: filteredCustomerIDs,
      totSize: size,
    };

    try {
      await Promise.all([
        axios.post("http://localhost:3100/api/campaign", payload),
        axios.post("http://localhost:3100/api/receipt", {
          filteredCustomerIDs,
        }),
      ]);

      setShowPopup(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log("Enter all fields, including message");
      console.log(error.message);
    }
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
            required
          />
          <button onClick={handleSubmit} type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </div>
      {campaigns.length > 0 ? (
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
                  {campaign.totSize}
                </p>
                {campaign.rules.length == 0 ? (
                  <p>
                    <span style={{ fontWeight: 600 }}>Rules: </span>Not
                    Applicable
                  </p>
                ) : (
                  <>
                    <p style={{ fontWeight: 600 }}>Rules: </p>
                    <ul
                      className="campaign-ul"
                      style={{ listStyleType: "disc", paddingLeft: "20px" }}
                    >
                      {campaign.rules.map((rule, idx) => (
                        <li>
                          <span style={{ fontWeight: 600 }}>
                            {rule.field.charAt(0).toUpperCase() +
                              rule.field.slice(1)}{" "}
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
                  </>
                )}

                <p style={{ marginTop: ".3rem" }}>
                  <span style={{ fontWeight: 600 }}>Message Sent: </span>{" "}
                  {campaign.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p style={{ fontStyle: "italic" }}>
          <span style={{ fontWeight: 600, color: "green", fontSize: "20px" }}>
            Nothing to show here..{" "}
          </span>
          <br />
          Please proceed on to create a segment & then the customers will be
          mapped according to the filtration logic provided above and the
          campaign data will be shown. All campaigns will be ranked in a
          descending order, meaning the campaign created recently will be shown
          first.
        </p>
      )}

      {showPopup && (
        <div className="popup">
          <p>Previewing Size: (Redirecting in 3 seconds)</p>
          Campaign sent to {previewSize} users!
        </div>
      )}
    </div>
  );
};

export default Campaigns;
