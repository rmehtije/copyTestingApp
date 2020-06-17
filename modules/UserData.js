const mongoose = require('mongoose');

const UserDataSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    imageUrl: String,
    birthday: Date,
    country: String,
    experience: [{
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
    }],
    bio: String,
    created: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('UserData', UserDataSchema);