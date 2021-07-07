"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointController = void 0;
const mongoose = __importStar(require("mongoose"));
const point_1 = require("../database/models/point");
const treatment_1 = require("../database/models/treatment");
const Point = mongoose.model('Point', point_1.PointSchema);
const Treatment = mongoose.model('Treatment', treatment_1.TreatmentSchema);
class PointController {
    getPoints(req, res) {
        Point.find({}, (err, points) => {
            if (err) {
                res.send(err);
            }
            res.json(points);
        });
    }
    getPoint(req, res) {
        Point.findOne({ _id: req.params.pointId }, (err, point) => {
            if (err) {
                res.send(err);
            }
            res.json(point);
        });
    }
    addPoint(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let point = yield Point.findOne({ name: req.body.name });
            if (point) {
                return res.status(400).send('Point already exisits!');
            }
            else {
                point = new Point({
                    'name': req.body.name,
                    'code': req.body.code,
                    'function': req.body.function,
                    'partOfEar': req.body.partOfEar,
                    'bodyPart': req.body.bodyPart,
                    'region': req.body.region,
                    'videoLink': req.body.videoLink
                });
                yield point.save();
                res.send(point);
            }
        });
    }
    updatePoint(req, res) {
        Point.findOneAndUpdate({ '_id': req.params.pointId }, { $set: req.body })
            .then((point) => res.send(point))
            .catch((error) => console.log(error));
    }
    deletePoint(req, res) {
        const removePointFromTreatments = (point) => {
            Treatment.updateMany({ $or: [{ master: point._id }, { primary: point._id }, { supplemental: point._id }] }, { $pullAll: { master: [point._id], primary: [point._id], supplemental: [point._id] } })
                .then(() => point)
                .catch((error) => console.log(error));
        };
        Point.findOneAndDelete({ _id: req.params.pointId })
            .then((point) => {
            removePointFromTreatments(point);
            res.send(point);
        })
            .catch((error) => console.log(error));
    }
}
exports.PointController = PointController;
//# sourceMappingURL=pointController.js.map