const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Blog = new Schema(
    {
        topic: { type: String, required: true },
        description: {type: String, required: true},
        title: { type: [String] },
        blogs: { type: [String] }
    },
    { timestamps: true }
)

module.exports = mongoose.model('blog', Blog)