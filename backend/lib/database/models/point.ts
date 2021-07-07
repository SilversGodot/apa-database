import * as mongoose from 'mongoose';

export const PointSchema = new mongoose.Schema({
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