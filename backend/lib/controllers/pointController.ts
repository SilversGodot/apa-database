import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import Point from '../database/models/point';

export class PointController {
    public getPoints (req: Request, res: Response){
        Point.find({}, (err: mongoose.CallbackError, points: any[]) => {
            if(err) {
                res.send(err);
            }
            res.json(points);
        });
    }

    public getPoint (req: Request, res: Response){
        Point.findOne({_id: req.params.pointId}, (err: mongoose.CallbackError, point: any) => {
            if (err) {
                res.send(err);
            }
            res.json(point);
        });
    }

    public async addPoint (req: Request, res: Response){
        let point = await Point.findOne({ name: req.body.name });

        if (point) {
            return res.status(400).send('Point already exisits!');
        } else {
            point = new Point({
                'name': req.body.name,
                'code': req.body.code,
                'function': req.body.function,
                'partOfEar': req.body.partOfEar,
                'bodyPart': req.body.bodyPart,
                'region': req.body.region,
                'videoLink': req.body.videoLink
            });

            await point.save();
            res.send(point); 
        }     
    }

    public updatePoint (req: Request, res: Response){
        Point.findOneAndUpdate( {'_id': req.params.pointId}, {$set: req.body})
        .then((point: any) => res.send(point))
        .catch((error: any) => console.log(error));
    }

    public deletePoint (req: Request, res: Response){    
        Point.findOneAndDelete({_id: req.params.pointId})
            .then((point: any) => {
                res.send(point);
            })
            .catch((error: any) => console.log(error));
    }
}