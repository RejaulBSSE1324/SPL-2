const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    regnumber: {
        type: String,
        required: true,
        unique: true
    },
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    currentYear: {
        type: Number,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    departmentName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'allocated', 'rejected'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Application', ApplicationSchema);
