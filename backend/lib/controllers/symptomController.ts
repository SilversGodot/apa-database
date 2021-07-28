import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import Symptom from '../database/models/symptom';
import Treatment from '../database/models/treatment';

export class SymptomController {
    public getSymptoms (req: Request, res: Response){
        Symptom.find({})
        .then((symptoms: any[]) => res.send(symptoms))
        .catch((error: any) => console.log(error));
    }

    public getSymptom (req: Request, res: Response){
        Symptom.find({_id: req.params.symptomId})
        .then((symptom: any) => res.send(symptom))
        .catch((error: any) => console.log(error));
    }

    public addSymptom (req: Request, res: Response){
        (new Symptom({
            'name': req.body.name,
            'treatments': req.body.treatments,
            'description': req.body.description
        })).save()
            .then((symptom: any) => res.send(symptom))
            .catch((error: any) => console.log(error));        
    }

    public updateSymptom (req: Request, res: Response){
        Symptom.findOneAndUpdate( {'_id': req.params.symptomId}, {$set: req.body})
            .then((symptom: any) => res.send(symptom))
            .catch((error: any) => console.log(error));        
    }

    public deleteSymptom (req: Request, res: Response){
        const removeSymptomFromTreatments = (symptom: any) => {
            Treatment.updateMany(
                    {  symptoms: symptom._id  },
                    {  $pullAll: {symptoms: [symptom._id]}  }
                )
                .then(() => symptom)
                .catch((error: any) => console.log(error));
        };

        Symptom.findOneAndDelete({_id: req.params.symptomId})
            .then((symptom: any) => {
                removeSymptomFromTreatments(symptom);
                res.send(symptom);
            })
            .catch((error: any) => console.log(error));        
    }
}