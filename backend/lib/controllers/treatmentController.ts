import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import Treatment from '../database/models/treatment';
import Symptom from '../database/models/symptom';

export class TreatmentController {
    public getTreatments (req: Request, res: Response) {
        Treatment.find({})
        .then((treatments: any[]) => res.send(treatments))
        .catch((error: any) => console.log(error));
    }

    public getTreatment (req: Request, res: Response) {
        Treatment.find({_id: req.params.treatmentId})
        .then((treatment: any) => res.send(treatment))
        .catch((error: any) => console.log(error));       
    }

    public async addTreatment (req: Request, res: Response) {
        // Mongoose validator will check in Point exist
        // Check if this treatment already exisits
        let treatment = await Treatment.findOne({ name: req.body.name });

        if (treatment) {
            return res.status(400).send('Treatment already exisits!');
        } else {
            try {
                treatment = new Treatment({
                    'name': req.body.name,
                    'points': req.body.points
                });
    
                await treatment.save();
                res.send(treatment);
            } catch (err) {
                res.send({"Error": err});
            }
        }    
    }

    public updateTreatment (req: Request, res: Response) {
        Treatment.findOneAndUpdate( {'_id': req.params.treatmentId}, {$set: req.body})
        .then((treatment: any) => res.send(treatment))
        .catch((error: any) => console.log(error));
    }

    public deleteTreatment (req: Request, res: Response) {
        const removeTreatmentFromSymptoms = (treatment: any) => {
            Symptom.updateMany(
                    {  treatments: treatment._id  },
                    {  $pullAll: {treatments: [treatment._id]}  }
                )
                .then(() => treatment)
                .catch((error: any) => console.log(error));
        };
    
        Treatment.findOneAndDelete({_id: req.params.treatmentId})
            .then((treatment: any) => {
                removeTreatmentFromSymptoms(treatment);
                res.send(treatment);
            })
            .catch((error: any) => console.log(error));
    }
}