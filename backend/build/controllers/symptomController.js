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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymptomController = void 0;
const mongoose = __importStar(require("mongoose"));
const symptom_1 = require("../database/models/symptom");
const treatment_1 = require("../database/models/treatment");
const Symptom = mongoose.model('Symptom', symptom_1.SymptomSchema);
const Treatment = mongoose.model('Treatment', treatment_1.TreatmentSchema);
class SymptomController {
    getSymptoms(req, res) {
        Symptom.find({})
            .then((symptoms) => res.send(symptoms))
            .catch((error) => console.log(error));
    }
    getSymptom(req, res) {
        Symptom.find({ _id: req.params.symptomId })
            .then((symptom) => res.send(symptom))
            .catch((error) => console.log(error));
    }
    addSymptom(req, res) {
        (new Symptom({
            'name': req.body.name,
            'treatments': req.body.treatments
        })).save()
            .then((symptom) => res.send(symptom))
            .catch((error) => console.log(error));
    }
    updateSymptom(req, res) {
        Symptom.findOneAndUpdate({ '_id': req.params.symptomId }, { $set: req.body })
            .then((symptom) => res.send(symptom))
            .catch((error) => console.log(error));
    }
    deleteSymptom(req, res) {
        const removeSymptomFromTreatments = (symptom) => {
            Treatment.updateMany({ symptoms: symptom._id }, { $pullAll: { symptoms: [symptom._id] } })
                .then(() => symptom)
                .catch((error) => console.log(error));
        };
        Symptom.findOneAndDelete({ _id: req.params.symptomId })
            .then((symptom) => {
            removeSymptomFromTreatments(symptom);
            res.send(symptom);
        })
            .catch((error) => console.log(error));
    }
}
exports.SymptomController = SymptomController;
//# sourceMappingURL=symptomController.js.map