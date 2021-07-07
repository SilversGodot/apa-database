import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { PointSchema } from '../database/models/point';
import { TreatmentSchema } from '../database/models/treatment';

const Point = mongoose.model('Point', PointSchema);
const Treatment = mongoose.model('Treatment', TreatmentSchema);

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
            if(err) {
                res.send(err);
            }
            res.json(point);
        });
    }

    public addPoint (req: Request, res: Response){
        (new Point({
            'name': req.body.name,
            'code': req.body.code,
            'function': req.body.function,
            'partOfEar': req.body.partOfEar,
            'bodyPart': req.body.bodyPart,
            'region': req.body.region,
            'videoLink': req.body.videoLink
        })).save()
            .then((point: any) => res.send(point))
            .catch((error: any) => console.log(error));        
    }

    public updatePoint (req: Request, res: Response){
        Point.findOneAndUpdate( {'_id': req.params.pointId}, {$set: req.body})
        .then((point: any) => res.send(point))
        .catch((error: any) => console.log(error));
    }

    public deletePoint (req: Request, res: Response){
        const removePointFromTreatments = (point: any) => {
            Treatment.updateMany(
                    {  $or: [{master: point._id}, {primary: point._id}, {supplemental: point._id}]  },
                    {  $pullAll: {master: [point._id], primary: [point._id], supplemental: [point._id]}  }
                )
                .then(() => point)
                .catch((error: any) => console.log(error));
        };
    
        Point.findOneAndDelete({_id: req.params.pointId})
            .then((point: any) => {
                removePointFromTreatments(point);
                res.send(point);
            })
            .catch((error: any) => console.log(error));
    }
}