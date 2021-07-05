const mongoose = require('mongoose');
const SymptomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    treatments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Treatment'
    }]
});

const Symptom = mongoose.model('Symptom', SymptomSchema);

module.exports = Symptom;