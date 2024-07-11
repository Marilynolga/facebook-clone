const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);