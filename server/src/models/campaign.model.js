import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
    rules: {
        expenditure: Number,
        visits: Number,
        activeDays: Number,
    },
    message: {
        type: String,
        required: true,
    },
    customerIDs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
        },
    ],
    totSize: {
        type: Number,
    },
    deliverySuccess: {
        type: Number,
    },
    deliveryFailure: {
        type: Number,
    },
},
    {
        timestamps: true,
    }
);

export default mongoose.model("Campaign", campaignSchema);
