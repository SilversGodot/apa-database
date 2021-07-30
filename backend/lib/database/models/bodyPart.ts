import * as mongoose from 'mongoose';
import Point from './point';

const BodyPartSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    }
});

export default mongoose.model("BodyPart", BodyPartSchema);