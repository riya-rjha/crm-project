import express from "express";
import deliveryReceiptController from "../controllers/deliveryReceipt.controller.js";

const app = express();

app.use("/receipt", deliveryReceiptController);

export default app;