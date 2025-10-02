const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    restaurantId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "restaurants",
        required: true
    }
}, {
    timestamps: true
});

const categoryModel = mongoose.model('categories', categorySchema);

module.exports = categoryModel;
