import * as mongoose from 'mongoose';
import FKHelper from '../helpers/foreign-key-helper';
import Symptom from './symptom';

const treatmentPointSchema = new mongoose.Schema({
    point: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Point',
        validate: {
            validator: async function(v: any) {
                return await FKHelper(mongoose.model("Point"), v)
            },
            message: `Point doesn't exist`
        }
    },
    type: {
      type: String,
      enum: ['primary', 'master', 'supplemental'],
      required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{ 
    _id : false 
});

const TreatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    points: [{
        type: treatmentPointSchema
    }],
    description: {
        type: String
    }
});

TreatmentSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        console.log('%s has been removed', doc._id);
        await Symptom.updateMany(
            { 'treatments.treatment': doc._id }, 
            { '$pull': { 'treatments': {'treatment': doc._id }} });
    }
});

export default mongoose.model("Treatment", TreatmentSchema);