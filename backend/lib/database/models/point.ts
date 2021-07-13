import * as mongoose from 'mongoose';
import FKHelper from '../helpers/foreign-key-helper';
import Treatment from './treatment';

// const pointEarRegionSchema = new mongoose.Schema({
//     earRegion: {
//         type : mongoose.Schema.Types.ObjectId,
//         ref: 'EarRegion',
//         validate: {
//             validator: async function(v: any) {
//                 return await FKHelper(mongoose.model("EarRegion"), v)
//             },
//             message: `Ear region doesn't exist`
//         }
//     },
//     _id: false
// });

// const pointBodyPartSchema = new mongoose.Schema({
//     earRegion: {
//         type : mongoose.Schema.Types.ObjectId,
//         ref: 'BodyPart',
//         validate: {
//             validator: async function(v: any) {
//                 return await FKHelper(mongoose.model("EarRegion"), v)
//             },
//             message: `Body part doesn't exist`
//         }
//     },
//     _id: false
// });

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
        type : mongoose.Schema.Types.ObjectId,
        ref: 'BodyPart',
        validate: {
            validator: async function(v: any) {
                return await FKHelper(mongoose.model("BodyPart"), v)
            },
            message: `Body part doesn't exist`
        }
    }],
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