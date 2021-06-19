const mongoose = require('mongoose');
const TreatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    primary: {
        type: [String]
    },
    supplemental: {
        type: [String]
    },
    master: {
        type: [String]
    }
});

const Treatment = mongoose.model('Treatment', TreatmentSchema);

module.exports = Treatment;