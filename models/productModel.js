const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage: {
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    },
    restaurantId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "restaurants",
        required: true
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "categories",
        required: true
    }
}, {
    timestamps: true
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
