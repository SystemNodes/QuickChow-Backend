const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    location: {
        type: String,
        required: true
    },
    restaurantImage: {
        url: {
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true
});

const restaurantModel = mongoose.model('restaurants', restaurantSchema);

module.exports = restaurantModel;
