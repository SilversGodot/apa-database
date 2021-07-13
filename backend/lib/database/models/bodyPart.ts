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

BodyPartSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        console.log('%s has been removed', doc._id);
        await Point.updateMany(
            { 'bodyParts': doc._id }, 
            { '$pull': { 'bodyParts':  doc._id } } );
    }
});

export default mongoose.model("BodyPart", BodyPartSchema);