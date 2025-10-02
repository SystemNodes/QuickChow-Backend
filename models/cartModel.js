const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.SchemaTypes.ObjectId, 
        ref: "users", 
        required: true 
    },
    items: [
        {
            product: { 
                type: mongoose.SchemaTypes.ObjectId,
                ref: "products", 
                required: true 
            },
            quantity: { 
                type: Number, 
                default: 1 
            }
        }
    ]
}, { 
    timestamps: true 
});

const cartModel = mongoose.model('carts', cartSchema); 

module.exports = cartModel;
