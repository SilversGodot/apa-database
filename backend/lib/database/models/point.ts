import * as mongoose from 'mongoose';
import FKHelper from '../helpers/foreign-key-helper';
import Treatment from './treatment';
import BodyPart from './bodyPart';

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
        type : mongoose.Schema.Types.ObjectId,
        ref: 'EarRegion',
        validate: {
            validator: async function(v: any) {
                return await FKHelper(mongoose.model("EarRegion"), v)
            },
            message: `Ear region doesn't exist`
        }
    },
    bodyParts : [{
        type : String
    }],
    videoLink: {
        type: String,
        default: ""
    }
});

// add bodyPart if point has any new bodyParts
PointSchema.post('save', async function(doc) {
    if (doc) {
        doc.bodyParts.forEach(function(n: string) {
            BodyPart.findOneAndUpdate(
                { name: n }, 
                { name: n }, 
                { upsert: true }, function(err, doc) {
                    if(err) console.log("Add bodyPart Error: ", err);
                });
        }); 
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