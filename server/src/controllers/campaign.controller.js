import express from "express";
import campaignModel from "../models/campaign.model.js";
import customerModel from "../models/customer.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { rules, operator1, operator2, message, customerIDs } = req.body;
        let customers = await customerModel.find();
        for (let rule of rules) {
            let field = rule.field;
            let operator = rule.operator;
            let value = rule.value;

            if (operator === 'lt') {
                customers = await customerModel.find(
                    {
                        [field]: { $lt: value }
                    }
                );
            } else if (operator === 'gt') {
                customers = await customerModel.find(
                    {
                        [field]: { $gt: value }
                    }
                );
            } else {
                customers = await customerModel.find(
                    {
                        [field]: { $eq: value }
                    }
                );
            }
        }

        const filteredCustomerIDs = customers.map(customer => customer._id);

        // console.log(customers)
        const newCampaign = new campaignModel({
            rules, operator1, operator2, message,
            customerIDs, totSize: customerIDs.length
        });
        await newCampaign.save();
        return res.status(201).json({
            message: "Campaign successfully added",
            campaigns: newCampaign,
            customers: customers,
            filteredCustomerIDs: filteredCustomerIDs
        })
    } catch (error) {
        console.log("Err: " + error.message);
        return res.status(500).json({
            message: "Check fields of campaign",
            err: error.message,
        })
    }
});

router.get("/", async (_, res) => {
    try {
        const campaigns = await campaignModel.find();
        return res.status(200).json({
            campaigns: campaigns,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

export default router;

// const filtered = await customerModel.find({ expenditure: { $gt: 5000 } });