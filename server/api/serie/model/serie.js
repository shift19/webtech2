const mongoose = require('mongoose')

const serieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    episodes: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Serie', serieSchema)