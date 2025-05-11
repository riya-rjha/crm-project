import mongoose from "mongoose";

const ruleSchema = new mongoose.Schema(
    {
        field: {
            type: String,
            required: true,
        },
        operator: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        }
    }
);

const campaignSchema = new mongoose.Schema({
    rules: [ruleSchema],
    operator1: {
        type: String,
        default: "AND"
    },
    operator2: {
        type: String,
        default: "AND"
    },
    message: {
        type: String,
        required: true,
    },
    customerIDs: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Customer",
            },
        ],
        required: true,
    },
    totSize: Number,
    deliverySuccess: Number,
    deliveryFailure: Number,
}, {
    timestamps: true,
});

export default mongoose.model("communication_log", campaignSchema);
