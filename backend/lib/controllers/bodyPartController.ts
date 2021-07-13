import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import BodyPart from '../database/models/bodyPart';

export class BodyPartController {
    public getBodyParts (req: Request, res: Response) {
        BodyPart.find({})
        .then((bodyParts: any[]) => res.send(bodyParts))
        .catch((error: any) => console.log(error));
    }

    public getBodyPart (req: Request, res: Response) {
        BodyPart.findOne({_id: req.params.bodypartId})
        .then((bodyPart: any) => res.send(bodyPart))
        .catch((error: any) => console.log(error));
    }

    public async addBodyPart (req: Request, res: Response) {
        let bodyPart = await BodyPart.findOne({ name: req.body.name });

        if (bodyPart) {
            return res.status(400).send('Body part already exisits!');
        }
        else {
            try {
                bodyPart = new BodyPart({
                    'name': req.body.name,
                    'description': req.body.description
                });
    
                await bodyPart.save();
                res.send(bodyPart);
            } catch (err) {
                res.send({"Error": err});
            }
        }
    }

    public updateBodyPart (req: Request, res: Response) {
        BodyPart.findOneAndUpdate({_id: req.params.bodypartId}, {$set: req.body})
        .then((bodyPart: any) => res.send(bodyPart))
        .catch((error: any) => console.log(error));
    }

    public deleteBodyPart (req: Request, res: Response) {
        BodyPart.findOneAndDelete({_id: req.params.bodypartId})
        .then((bodyPart: any) => res.send(bodyPart))
        .catch((error: any) => console.log(error));
    }
}