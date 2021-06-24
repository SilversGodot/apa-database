const mongoose = require('mongoose');
const PointSchema = new mongoose.Schema({
    name: {
        type: String,
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

const Point = mongoose.model('Point', PointSchema);

module.exports = Point;