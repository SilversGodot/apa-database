const mongoose = require('mongoose');
const TreatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    primary: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Point'
    }],
    supplemental: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Point'
    }],
    master: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Point'
    }]
});

const Treatment = mongoose.model('Treatment', TreatmentSchema);

module.exports = Treatment;