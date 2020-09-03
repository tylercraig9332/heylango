const mongoose = require("mongoose")

const LangoScheme = mongoose.Schema({
    content: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    language: {type: String, required: true},
    author: {type: mongoose.Types.ObjectId, required: true},
    imageSrc: {type: String, default: ''},
    alternateContent: {type: String},
    audio: {type: Buffer},
    video_id: {type: String},
    difficulty: {type: String, default: 'NA'},
    likes: {type: Number}
}, { timestamp: true })

module.exports = mongoose.model('Lango', LangoScheme)