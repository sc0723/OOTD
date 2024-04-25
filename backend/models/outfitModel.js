const mongoose = require('mongoose')

const Schema = mongoose.Schema

const outfitSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    top: {
        type: String,
        required: true
    },
    bottom: {
        type: String,
        required: true
    },
    shoes: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Outfit', outfitSchema)

