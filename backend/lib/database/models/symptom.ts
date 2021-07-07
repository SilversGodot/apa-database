import * as mongoose from 'mongoose';

export const SymptomSchema = new mongoose.Schema({
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