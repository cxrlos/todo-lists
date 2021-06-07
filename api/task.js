const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }, 
    status: {
        type: String,
        default: "In progress"
    }
})

module.exports = mongoose.model('TodoTask',todoTaskSchema);
