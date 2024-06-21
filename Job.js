const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: String,
    title: String,
    description: String,
    requirements: String,
    resume: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
