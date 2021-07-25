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
exports.BodyPartController = void 0;
const bodyPart_1 = __importDefault(require("../database/models/bodyPart"));
class BodyPartController {
    getBodyParts(req, res) {
        bodyPart_1.default.find({})
            .then((bodyParts) => res.send(bodyParts))
            .catch((error) => console.log(error));
    }
    getBodyPart(req, res) {
        bodyPart_1.default.findOne({ _id: req.params.bodypartId })
            .then((bodyPart) => res.send(bodyPart))
            .catch((error) => console.log(error));
    }
    addBodyPart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let bodyPart = yield bodyPart_1.default.findOne({ name: req.body.name });
            if (bodyPart) {
                return res.status(400).send('Body part already exisits!');
            }
            else {
                try {
                    bodyPart = new bodyPart_1.default({
                        'name': req.body.name,
                        'description': req.body.description
                    });
                    yield bodyPart.save();
                    res.send(bodyPart);
                }
                catch (err) {
                    res.send({ "Error": err });
                }
            }
        });
    }
    updateBodyPart(req, res) {
        bodyPart_1.default.findOneAndUpdate({ _id: req.params.bodypartId }, { $set: req.body })
            .then((bodyPart) => res.send(bodyPart))
            .catch((error) => console.log(error));
    }
    deleteBodyPart(req, res) {
        bodyPart_1.default.findOneAndDelete({ _id: req.params.bodypartId })
            .then((bodyPart) => res.send(bodyPart))
            .catch((error) => console.log(error));
    }
}
exports.BodyPartController = BodyPartController;
//# sourceMappingURL=bodyPartController.js.map