const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "users", 
        required: true 
    },
    items: [
        {
            productId: { 
                type: mongoose.SchemaTypes.ObjectId, 
                ref: "products", 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            }
        }
    ],
    totalAmount: { 
        type: Number, 
        required: true 
    },
    orderStatus: {
        type: String,
        enum: ["pending", "confirmed", "in-process", "out-for-delivery", "delivered", "cancelled"],
        default: "pending"
    },
    transactionId: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "transactions" 
    },
    deliveryAddress: { 
        type: String, 
        required: true 
    },
    notes: { 
        type: String 
    }
}, { 
    timestamps: true 
});

const orderModel = mongoose.model('orders', orderSchema);

module.exports = orderModel;
