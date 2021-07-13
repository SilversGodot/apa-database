import * as mongoose from 'mongoose';
import Point from './point';

const EarRegionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    }
});

EarRegionSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        console.log('%s has been removed', doc._id);
        await Point.updateMany(
            { 'partOfEar': doc._id }, 
            { 'partOfEar': undefined } );
    }
});

export default mongoose.model("EarRegion", EarRegionSchema);