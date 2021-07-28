import * as mongoose from 'mongoose';
import FKHelper from '../helpers/foreign-key-helper';

const symptomTreatmentSchema = new mongoose.Schema({
    treatment: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Treatment',
        validate: {
            validator: async function(v: any) {
                return await FKHelper(mongoose.model("Treatment"), v)
            },
            message: `Treatment doesn't exist`
        }
    }
},
{ 
    _id : false 
});

const SymptomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    treatments: [{
        type : symptomTreatmentSchema
    }],
    description: {
        type: String
    }
});

export default mongoose.model("Symptom", SymptomSchema);