import * as mongoose from 'mongoose';
import Treatment from './treatment';

const PointSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: String,
        default: ""
    },
    function: {
        type: String,
        default: ""
    },
    location : [{
        x: {
            type: Number,
            default: 0
        },
        y: {
            type: Number,
            default: 0
        },
        z: {
            type: Number,
            default: 0
        }
    }],
    partOfEar: {
        type: String,
        default: ""
    },
    bodyPart : {
        type: String,
        default: ""
    },
    videoLink: {
        type: String,
        default: ""
    }
});

PointSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        console.log('%s has been removed', doc._id);
        await Treatment.updateMany(
            { 'points.point': doc._id }, 
            { '$set': { 'points.$.isDeleted': true } });
    }
});

export default mongoose.model("Point", PointSchema);