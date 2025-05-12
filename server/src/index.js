import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import customerRoute from "./routes/customer.route.js";
import campaignRoute from "./routes/campaign.route.js";
import deliveryReceiptRoute from "./routes/deliveryreceipt.route.js";
import aiSummarizationRoute from "./routes/aiSummarization.route.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/api", customerRoute);
app.use("/api", campaignRoute);
app.use("/api", deliveryReceiptRoute);
app.use("/ai", aiSummarizationRoute);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.log(err.message);
  }
  app.listen(PORT || 8000, () => {
    console.log(`Successfully connected to PORT ${process.env.PORT}`);
  });
};

connectToDatabase();
