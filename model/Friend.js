const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    userId: { type: String, required: true },
    friendId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
});

module.exports = mongoose.model('Friend', FriendSchema);