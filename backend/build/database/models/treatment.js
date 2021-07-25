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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const foreign_key_helper_1 = __importDefault(require("../helpers/foreign-key-helper"));
const symptom_1 = __importDefault(require("./symptom"));
const treatmentPointSchema = new mongoose.Schema({
    point: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Point',
        validate: {
            validator: function (v) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield foreign_key_helper_1.default(mongoose.model("Point"), v);
                });
            },
            message: `Point doesn't exist`
        }
    },
    type: {
        type: String,
        enum: ['primary', 'supplemental', 'master'],
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    _id: false
});
const TreatmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    points: [{
            type: treatmentPointSchema
        }],
    description: {
        type: String
    }
});
TreatmentSchema.post('findOneAndDelete', function (doc) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            console.log('%s has been removed', doc._id);
            yield symptom_1.default.updateMany({ 'treatments.treatment': doc._id }, { '$pull': { 'treatments': { 'treatment': doc._id } } });
        }
    });
});
exports.default = mongoose.model("Treatment", TreatmentSchema);
//# sourceMappingURL=treatment.js.map