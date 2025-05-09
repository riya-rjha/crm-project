import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    expenditure: {
        type: Number,
        default: 0
    },
    visits: {
        type: Number,
        default: 0
    },
    activeDays: {
        type: Number,
        default: 0
    }
});

const customer = mongoose.model('Customers', customerSchema);

export default customer;
