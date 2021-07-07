import * as mongoose from 'mongoose';

const SymptomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    treatments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Treatment'
    }]
});

export default mongoose.model("Symptom", SymptomSchema);