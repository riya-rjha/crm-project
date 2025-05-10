import express from "express";
import campaignModel from "../models/campaign.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { rules, operator1, operator2, message, customerIDs } = req.body;
        const newCampaign = new campaignModel({
            rules, operator1, operator2, message,
            customerIDs, totSize: customerIDs.length
        });
        await newCampaign.save();
        return res.status(200).json({
            message: "Campaign successfully added",
            campaigns: newCampaign
        })
    } catch (error) {
        console.log("Err: " + error.message);
        return res.status(400).json({
            message: "Check fields of campaign",
            err: error.message,
        })
    }
});

export default router;

// const filtered = await customerModel.find({ expenditure: { $gt: 5000 } });