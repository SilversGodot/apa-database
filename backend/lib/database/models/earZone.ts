import * as mongoose from 'mongoose';

const EarZoneSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

export default mongoose.model("EarZone", EarZoneSchema);