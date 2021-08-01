import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import Treatment from '../database/models/treatment';
import Symptom from '../database/models/symptom';

export class TreatmentController {
    public getTreatments (req: Request, res: Response) {
        Treatment.find({})
        .populate('points.point')
        .exec((err: any, treatment:any) => {
            res.send(treatment);
            if (err) console.log()
        });
    }

    public getTreatment (req: Request, res: Response) {
        Treatment.findOne({_id: req.params.treatmentId})
        .populate('points.point')
        .exec((err: any, treatment: any) => {
            console.log("Populated Points " + treatment);
            res.send(treatment);
        });       
    }

    public async addTreatment (req: Request, res: Response) {
        // Mongoose validator will check in Point exist
        // Check if this treatment already exisits
        let treatment = await Treatment.findOne({ name: req.body.name });

        if (treatment) {
            return res.status(400).send({ 'message': 'Treatment already exisits!' });
        } else {
            try {
                treatment = new Treatment({
                    'name': req.body.name,
                    'points': req.body.points,
                    'description': req.body.description
                });

                await treatment.save();
                console.log(treatment);
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