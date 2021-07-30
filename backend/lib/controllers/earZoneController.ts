import { Request, Response } from 'express';
import EarZone from '../database/models/earZone';

export class EarZoneController {
    public getEarZones (req: Request, res: Response) {
        EarZone.find({})
        .sort('name')
        .then((earZones: any[]) => res.send(earZones))
        .catch((error: any) => console.log(error));
    }

    public getEarZone (req: Request, res: Response) {
        EarZone.findOne({_id: req.params.earZoneId})
        .then((earZone: any) => res.send(earZone))
        .catch((error: any) => console.log(error));
    }

    public async addEarZone (req: Request, res: Response) {
        let earZone = await EarZone.findOne({ name: req.body.name });

        if (earZone) {
            return res.status(400).send('EarZone already exisits!');
        }
        else {
            try {
                earZone = new EarZone({
                    'name': req.body.name
                });
    
                await earZone.save();
                res.send(earZone);
            } catch (err) {
                res.send({"Error": err});
            }
        }
    }

    public updateEarZone (req: Request, res: Response) {
        EarZone.findOneAndUpdate({_id: req.params.earZoneId}, {$set: req.body})
        .then((earZone: any) => res.send(earZone))
        .catch((error: any) => console.log(error));
    }

    public deleteEarZone (req: Request, res: Response) {
        EarZone.findOneAndDelete({_id: req.params.earZoneId})
        .then((earZone: any) => res.send(earZone))
        .catch((error: any) => console.log(error));
    }
}