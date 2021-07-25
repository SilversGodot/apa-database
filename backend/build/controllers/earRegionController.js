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
exports.EarRegionController = void 0;
const earRegion_1 = __importDefault(require("../database/models/earRegion"));
class EarRegionController {
    getEarRegions(req, res) {
        earRegion_1.default.find({})
            .then((earRegions) => res.send(earRegions))
            .catch((error) => console.log(error));
    }
    getEarRegion(req, res) {
        earRegion_1.default.findOne({ _id: req.params.earregionId })
            .then((earRegion) => res.send(earRegion))
            .catch((error) => console.log(error));
    }
    addEarRegion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let earRegion = yield earRegion_1.default.findOne({ name: req.body.name });
            if (earRegion) {
                return res.status(400).send('Ear region already exisits!');
            }
            else {
                try {
                    earRegion = new earRegion_1.default({
                        'name': req.body.name,
                        'description': req.body.description
                    });
                    yield earRegion.save();
                    res.send(earRegion);
                }
                catch (err) {
                    res.send({ "Error": err });
                }
            }
        });
    }
    updateEarRegion(req, res) {
        earRegion_1.default.findOneAndUpdate({ _id: req.params.earregionId }, { $set: req.body })
            .then((earRegion) => res.send(earRegion))
            .catch((error) => console.log(error));
    }
    deleteEarRegion(req, res) {
        earRegion_1.default.findOneAndDelete({ _id: req.params.earregionId })
            .then((earRegion) => res.send(earRegion))
            .catch((error) => console.log(error));
    }
}
exports.EarRegionController = EarRegionController;
//# sourceMappingURL=earRegionController.js.map