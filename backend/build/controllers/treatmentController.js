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
exports.TreatmentController = void 0;
const treatment_1 = __importDefault(require("../database/models/treatment"));
const symptom_1 = __importDefault(require("../database/models/symptom"));
class TreatmentController {
    getTreatments(req, res) {
        treatment_1.default.find({})
            .populate('points.point')
            .exec((err, treatment) => {
            res.send(treatment);
            if (err)
                console.log();
        });
    }
    getTreatment(req, res) {
        treatment_1.default.findOne({ _id: req.params.treatmentId })
            .populate('points.point')
            .exec((err, treatment) => {
            console.log("Populated Points " + treatment);
            res.send(treatment);
        });
    }
    addTreatment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Mongoose validator will check in Point exist
            // Check if this treatment already exisits
            let treatment = yield treatment_1.default.findOne({ name: req.body.name });
            if (treatment) {
                return res.status(400).send({ 'message': 'Treatment already exisits!' });
            }
            else {
                try {
                    treatment = new treatment_1.default({
                        'name': req.body.name,
                        'points': req.body.points,
                        'description': req.body.description
                    });
                    yield treatment.save();
                    res.send(treatment);
                }
                catch (err) {
                    res.send({ "Error": err });
                }
            }
        });
    }
    updateTreatment(req, res) {
        treatment_1.default.findOneAndUpdate({ '_id': req.params.treatmentId }, { $set: req.body })
            .then((treatment) => res.send(treatment))
            .catch((error) => console.log(error));
    }
    deleteTreatment(req, res) {
        const removeTreatmentFromSymptoms = (treatment) => {
            symptom_1.default.updateMany({ treatments: treatment._id }, { $pullAll: { treatments: [treatment._id] } })
                .then(() => treatment)
                .catch((error) => console.log(error));
        };
        treatment_1.default.findOneAndDelete({ _id: req.params.treatmentId })
            .then((treatment) => {
            removeTreatmentFromSymptoms(treatment);
            res.send(treatment);
        })
            .catch((error) => console.log(error));
    }
}
exports.TreatmentController = TreatmentController;
//# sourceMappingURL=treatmentController.js.map