import * as mongoose from 'mongoose';

const treatmentPointSchema = new mongoose.Schema({
    point: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Point'
    },
    type: {
      type: String, // primary, supplemental, master
      required: true
    }
  });

export const TreatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    points: [{
        type: treatmentPointSchema
    }]
});