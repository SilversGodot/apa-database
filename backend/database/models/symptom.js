const mongoose = require('mongoose');
const SymptomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    treatments: {
        type: [String]
    }
});

const Symptom = mongoose.model('Symptom', SymptomSchema);

module.exports = Symptom;