import express from "express";
import customerController from "../controllers/customer.controller.js"

const app = express();

app.use('/customer', customerController);

export default app;