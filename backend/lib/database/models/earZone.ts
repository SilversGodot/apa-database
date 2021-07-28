import * as mongoose from 'mongoose';

const EarZoneSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    alias: [{
        name: { type: String, default: ""},
        lang: { type: String, default: "en"}
    }]
});

export default mongoose.model("EarZone", EarZoneSchema);