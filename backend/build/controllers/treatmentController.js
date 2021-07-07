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
exports.TreatmentController = void 0;
const mongoose = __importStar(require("mongoose"));
const treatment_1 = require("../database/models/treatment");
const symptom_1 = require("../database/models/symptom");
const Treatment = mongoose.model('Treatment', treatment_1.TreatmentSchema);
const Symptom = mongoose.model('Symptom', symptom_1.SymptomSchema);
class TreatmentController {
    getTreatments(req, res) {
        console.log('getTreatments');
        Treatment.find({})
            .then((treatments) => res.send(treatments))
            .catch((error) => console.log(error));
    }
    getTreatment(req, res) {
        console.log('getTreatment');
        Treatment.find({ _id: req.params.treatmentId })
            .then((treatment) => res.send(treatment))
            .catch((error) => console.log(error));
    }
    addTreatment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // First Validate The Request
            //const { error } = validate(req.body);
            //if (error) {
            //    return res.status(400).send(error);
            //}
            // Check if this treatment already exisits
            let treatment = yield Treatment.findOne({ name: req.body.name });
            if (treatment) {
                return res.status(400).send('Treatment already exisits!');
            }
            else {
                treatment = new Treatment({
                    'name': req.body.name,
                    'points': []
                });
                yield treatment.save();
                res.send(treatment);
            }
        });
    }
    updateTreatment(req, res) {
        Treatment.findOneAndUpdate({ '_id': req.params.treatmentId }, { $set: req.body })
            .then((treatment) => res.send(treatment))
            .catch((error) => console.log(error));
    }
    deleteTreatment(req, res) {
        console.log(req);
        const removeTreatmentFromSymptoms = (treatment) => {
            Symptom.updateMany({ treatments: treatment._id }, { $pullAll: { treatments: [treatment._id] } })
                .then(() => treatment)
                .catch((error) => console.log(error));
        };
        Treatment.findOneAndDelete({ _id: req.params.treatmentId })
            .then((treatment) => {
            removeTreatmentFromSymptoms(treatment);
            res.send(treatment);
        })
            .catch((error) => console.log(error));
    }
}
exports.TreatmentController = TreatmentController;
//# sourceMappingURL=treatmentController.js.map