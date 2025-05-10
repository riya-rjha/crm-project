import express from "express";
import campaignController from "../controllers/campaign.controller.js"

const app = express();

app.use("/campaign", campaignController);

export default app;