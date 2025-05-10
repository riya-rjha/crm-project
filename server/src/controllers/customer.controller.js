import express from "express";
import customerModel from "../models/customer.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, expenditure, visits, activeDays } = req.body;
    if (!name || expenditure == undefined || visits == undefined || activeDays == undefined) {
        return res.status(400).json("Incomplete information about the user.");
    }
    try {
        const newCustomer = new customerModel({
            name, expenditure, visits, activeDays
        });
        const savedCustomer = await newCustomer.save();
        const allCustomers = await customerModel.find();
        return res.status(201).json(
            {
                message: "Customer added",
                customerAdded: savedCustomer,
                allCustomers: allCustomers,
            });
    } catch (error) {
        return res.status(500).json("Customer could not be added");
    }
});

router.get("/", async (_, res) => {
    try {
        const customers = await customerModel.find();
        return res.status(200).json({
            allCustomers: customers,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch customers",
            error: error.message
        });
    }
});


export default router;