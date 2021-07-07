import * as mongoose from 'mongoose';
import FKHelper from '../helpers/foreign-key-helper';

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
      enum: ['primary', 'supplemental', 'master'],
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
    }]
});

export default mongoose.model("Treatment", TreatmentSchema);