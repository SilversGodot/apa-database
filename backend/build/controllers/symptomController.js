"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymptomController = void 0;
const symptom_1 = __importDefault(require("../database/models/symptom"));
const treatment_1 = __importDefault(require("../database/models/treatment"));
class SymptomController {
    getSymptoms(req, res) {
        symptom_1.default.find({})
            .then((symptoms) => res.send(symptoms))
            .catch((error) => console.log(error));
    }
    getSymptom(req, res) {
        symptom_1.default.find({ _id: req.params.symptomId })
            .then((symptom) => res.send(symptom))
            .catch((error) => console.log(error));
    }
    addSymptom(req, res) {
        (new symptom_1.default({
            'name': req.body.name,
            'treatments': req.body.treatments
        })).save()
            .then((symptom) => res.send(symptom))
            .catch((error) => console.log(error));
    }
    updateSymptom(req, res) {
        symptom_1.default.findOneAndUpdate({ '_id': req.params.symptomId }, { $set: req.body })
            .then((symptom) => res.send(symptom))
            .catch((error) => console.log(error));
    }
    deleteSymptom(req, res) {
        const removeSymptomFromTreatments = (symptom) => {
            treatment_1.default.updateMany({ symptoms: symptom._id }, { $pullAll: { symptoms: [symptom._id] } })
                .then(() => symptom)
                .catch((error) => console.log(error));
        };
        symptom_1.default.findOneAndDelete({ _id: req.params.symptomId })
            .then((symptom) => {
            removeSymptomFromTreatments(symptom);
            res.send(symptom);
        })
            .catch((error) => console.log(error));
    }
}
exports.SymptomController = SymptomController;
//# sourceMappingURL=symptomController.js.map