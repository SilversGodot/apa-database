import * as mongoose from 'mongoose';
import FKHelper from '../helpers/foreign-key-helper';
import Treatment from './treatment';

const PointSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    alias: [{ 
        type: String, 
        default: "" 
    }],
    chineseEarZones: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'EarZone',
        validate: {
            validator: async function(v: any) {
                return await FKHelper(mongoose.model("EarZone"), v)
            },
            message: `Ear zone doesn't exist`
        }       
    }],
    europeanEarZones: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'EarZone',
        validate: {
            validator: async function(v: any) {
                return await FKHelper(mongoose.model("EarZone"), v)
            },
            message: `Ear zone doesn't exist`
        }        
    }],
    earAnatomy: {
        type: String,
        default: ""      
    },
    function: {
        type: String,
        default: ""
    },
    location : {
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
    },
    code: {
        type: String,
        default: ""
    },
    videoLink: {
        type: Number,
        default: 0
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