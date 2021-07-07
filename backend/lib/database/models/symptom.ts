import * as mongoose from 'mongoose';

export const SymptomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    treatments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Treatment'
    }]
});