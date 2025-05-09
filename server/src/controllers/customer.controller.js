import express from "express";
import customerModel from "../models/customer.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, expenditure, visits, activeDays } = req.body;
    if (!name || expenditure == undefined) {
        return res.status(400).json("Incomplete information about the user.");
    }
    try {
        const newCustomer = new customerModel({
            name, expenditure, visits, activeDays
        });
        const savedCustomer = await newCustomer.save();
        return res.status(201).json(
            {
                message: "Customer added",
                customer: savedCustomer
            });
    } catch (error) {
        return res.status(500).json("Customer could not be added");
    }
});

export default router;