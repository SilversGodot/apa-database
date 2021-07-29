import * as mongoose from 'mongoose';
import FKHelper from '../helpers/foreign-key-helper';

const SymptomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    treatments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Treatment',
        validate: {
            validator: async function(v: any) {
                return await FKHelper(mongoose.model("Treatment"), v)
            },
            message: `Treatment doesn't exist`
        }
    }],
    description: {
        type: String
    }
});

export default mongoose.model("Symptom", SymptomSchema);