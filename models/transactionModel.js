const { string } = require('joi');
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "users", 
        required: true 
    },
    orderId: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "orders" 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    currency: {
        type: String,
        default: "NGN"
    },
    paymentMethod: { 
        type: String, 
        enum: ["card", "bank_transfer", "pay_with_bank", "mobile_money"], 
        required: true 
    },
    paymentStatus: { type: String, 
        enum: ["pending", "successful", "failed"], 
        default: "pending" 
    },
    korapayReference: { 
        type: String, 
        required: true, 
        unique: true 
    }
}, { 
    timestamps: true 
});

const transactionModel = mongoose.model('transactions', transactionSchema);

module.exports = transactionModel;
