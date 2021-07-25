import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import EarRegion from '../database/models/earRegion';

export class EarRegionController {
    public getEarRegions (req: Request, res: Response) {
        EarRegion.find({})
        .then((earRegions: any[]) => res.send(earRegions))
        .catch((error: any) => console.log(error));
    }

    public getEarRegion (req: Request, res: Response) {
        EarRegion.findOne({_id: req.params.earregionId})
        .then((earRegion: any) => res.send(earRegion))
        .catch((error: any) => console.log(error));
    }

    public async addEarRegion (req: Request, res: Response) {
        let earRegion = await EarRegion.findOne({ name: req.body.name });

        if (earRegion) {
            return res.status(400).send('Ear region already exisits!');
        }
        else {
            try {
                earRegion = new EarRegion({
                    'name': req.body.name,
                    'description': req.body.description
                });
    
                await earRegion.save();
                res.send(earRegion);
            } catch (err) {
                res.send({"Error": err});
            }
        }
    }

    public updateEarRegion (req: Request, res: Response) {
        console.log(req.body);

        EarRegion.findOneAndUpdate({_id: req.params.earregionId}, {$set: req.body})
        .then((earRegion: any) => res.send(earRegion))
        .catch((error: any) => console.log(error));
    }

    public deleteEarRegion (req: Request, res: Response) {
        EarRegion.findOneAndDelete({_id: req.params.earregionId})
        .then((earRegion: any) => res.send(earRegion))
        .catch((error: any) => console.log(error));
    }
}