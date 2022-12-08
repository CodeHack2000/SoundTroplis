const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ArtistSchema = new Schema({
    variation: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    status: {
        type: Boolean,
        required: true,
        default: true,
    }
})

module.exports = mongoose.model('Artist', ArtistSchema)