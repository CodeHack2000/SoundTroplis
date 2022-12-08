const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    artist: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true,
    },

    rank: {
        type: Number,
        required: true,
    },

    comment: {
        type: String,
    },

    status: {
        type: Boolean,
        required: true,
        default: true,
    }
})

module.exports = mongoose.model('Review', ReviewSchema)