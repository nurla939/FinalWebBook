const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    Author: { type: String, required: true },
    name: { type: String, required: true },
    pages: { type: Number, default: 0 },
    image: { type: String, default: '/uploads/default.jpg' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('book', bookSchema);
