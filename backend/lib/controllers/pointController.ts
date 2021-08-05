import { Request, Response } from 'express';
import Point from '../database/models/point';

export class PointController {
    public getPoints (req: Request, res: Response){
        Point.find({})
        .sort('code')
        .populate('chineseEarZones europeanEarZones')
        .exec((err: any, points: any) => {
            res.send(points);
            if (err) console.log(err)
        });
    }

    public getPoint (req: Request, res: Response){
        Point.findOne({_id: req.params.pointId})
        .populate('chineseEarZones europeanEarZones')
        .exec((err: any, point: any) => {
            res.send(point);
            if (err) console.log(err)
        }); 
    }

    public async addPoint (req: Request, res: Response){
        let point = await Point.findOne({ name: req.body.name });

        if (point) {
            return res.status(400).send({ 'message': 'Point already exisits!' });
        } else {
            point = new Point({
                'code': req.body.code,
                'name': req.body.name,
                'alias': req.body.alias,
                'chineseEarZones': req.body.chineseEarZones,
                'europeanEarZones': req.body.europeanEarZones,
                'earAnatomy': req.body.earAnatomy,
                'function': req.body.function,
                'videoLink': req.body.videoLink,
                'location': req.body.location
            });

            console.log(point);

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