const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    regi_number: {
        type: String,
        required: true,
        unique: true
    },
    departmant_name: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
    study_year: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Student', StudentSchema);
