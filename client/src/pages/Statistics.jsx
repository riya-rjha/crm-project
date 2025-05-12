import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const Statistics = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [receipts, setReceipts] = useState([]);
  const [sent, setSent] = useState(0);
  const [fail, setFail] = useState(0);

  useEffect(() => {
    const getReceipts = async () => {
      const response = await axios.get("http://localhost:3100/api/receipt");
      const receiptsFetched = response.data.receipts;
      setReceipts(receiptsFetched);

      let success = 0;
      let failure = 0;
      receiptsFetched.forEach((receipt) => {
        if (receipt.deliveryStatus === "success") success++;
        else failure++;
      });

      setSent(success);
      setFail(failure);
    };

    getReceipts();
  }, []);

  const data = {
    labels: ["Success", "Fail"],
    datasets: [
      {
        data: [sent, fail],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderColor: ["#388E3C", "#D32F2F"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 60,
          boxHeight: 30,
          padding: 20,
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div className="statistics">
      <h1 className="statistics-heading">Statistics</h1>

      {sent != 0 && fail != 0 ? (
        <>
          <div className="pie-chart">
            <Pie className="pie-set" data={data} options={options} />
          </div>
          <table className="statistics-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Message</th>
                <th>Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt, idx) => (
                <tr key={receipt._id}>
                  <td>{idx + 1}</td>
                  <td>{receipt.customerName}</td>
                  <td>{receipt.message}</td>
                  <td>{receipt.deliveryStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p style={{ fontStyle: "italic" }}>
          <span style={{ fontWeight: 600, color: "red", fontSize: "20px" }}>
            Nothing to show here..{" "}
          </span>
          <br />
          Please proceed with the campaigns page to create a campaign and then
          come back here to view a list of customers and a statistical data of
          customers who have received the campaign message & the ones who
          haven't.
        </p>
      )}
    </div>
  );
};

export default Statistics;
