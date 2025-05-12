import mongoose from "mongoose";

const customerReceiptSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    campaignID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "communication_log",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    deliveryStatus: {
        type: String,
        default: "success",
        required: true,
    }
});

export default mongoose.model("delivery_receipt", customerReceiptSchema);