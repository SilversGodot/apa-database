"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointController = void 0;
const point_1 = __importDefault(require("../database/models/point"));
class PointController {
    getPoints(req, res) {
        point_1.default.find({})
            .populate('partOfEar')
            .exec((err, points) => {
            res.send(points);
            if (err)
                console.log(err);
        });
    }
    getPoint(req, res) {
        point_1.default.findOne({ _id: req.params.pointId })
            .populate('partOfEar bodyParts')
            .exec((err, point) => {
            res.send(point);
            if (err)
                console.log(err);
        });
    }
    addPoint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let point = yield point_1.default.findOne({ name: req.body.name });
            if (point) {
                return res.status(400).send({ 'message': 'Point already exisits!' });
            }
            else {
                point = new point_1.default({
                    'name': req.body.name,
                    'code': req.body.code,
                    'function': req.body.function,
                    'partOfEar': req.body.partOfEar,
                    'bodyParts': req.body.bodyParts,
                    'videoLink': req.body.videoLink
                });
                console.log(point);
                yield point.save();
                res.send(point);
            }
        });
    }
    updatePoint(req, res) {
        point_1.default.findOneAndUpdate({ '_id': req.params.pointId }, { $set: req.body })
            .then((point) => res.send(point))
            .catch((error) => console.log(error));
    }
    deletePoint(req, res) {
        point_1.default.findOneAndDelete({ _id: req.params.pointId })
            .then((point) => {
            res.send(point);
        })
            .catch((error) => console.log(error));
    }
}
exports.PointController = PointController;
//# sourceMappingURL=pointController.js.map