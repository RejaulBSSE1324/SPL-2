const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
    seatNumber: {
        type: Number,
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    floorNumber: {
        type: Number,
        required: true
    },
    buildingName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied'],
        default: 'Available'
    },
    student: {
        name: { type: String },
        reg: { type: String }
    }
});

// Ensure uniqueness
SeatSchema.index({ seatNumber: 1, roomNumber: 1, buildingName: 1 }, { unique: true });

module.exports = mongoose.model('seats', SeatSchema);