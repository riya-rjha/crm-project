import express from "express";
import customerModel from "../models/customer.model.js";
import { calculateDeliveryStatus, createPersonalizedMessage } from "./dummyVendor.controller.js";
import campaignModel from "../models/campaign.model.js";
import deliveryReceiptModel from "../models/deliveryReceipt.model.js";

const router = express.Router();

router.post("/", async (_, res) => {
    try {
        const customers = await customerModel.find();
        const campaigns = await campaignModel.find();

        // console.log(customers)
        // console.log(campaigns)

        for (const customer of customers) {
            for (const campaign of campaigns) {
                if (campaign.customerIDs.includes(customer._id)) {
                    // console.log("Matched")
                    const deliveryStatus = calculateDeliveryStatus();
                    const personalizedMessage = await createPersonalizedMessage(customer.name, customer.expenditure, customer.visits, campaign.message);
                    const newDeliveryReceipt = new deliveryReceiptModel({
                        customerID: customer._id,
                        customerName: customer.name,
                        campaignID: campaign._id,
                        message: personalizedMessage,
                        deliveryStatus,
                    });

                    await newDeliveryReceipt.save();
                    break;
                }
            }
        }

        res.status(200).json(
            { message: "Delivery receipts created successfully" }
        );
    } catch (error) {
        console.log("Error creating delivery receipts:" + error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/", async (_, res) => {
    try {
        let response = await deliveryReceiptModel.find();
        return res.status(200).json({
            receipts: response
        })
    } catch (error) {
        return res.status(500).json({
            error: "Error fetching delivery receipts"
        })
    }

});

export default router;