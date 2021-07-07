"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const apaRoutes_1 = require("./routes/apaRoutes");
const NAMESPACE = 'Server';
class App {
    constructor() {
        this.mongoUrl = 'mongodb+srv://apa-admin:nov11222@apa-database.hszts.mongodb.net/apa?retryWrites=true&w=majority';
        this.routePrv = new apaRoutes_1.Routes();
        this.app = express_1.default();
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }
    config() {
        //support application/x-www-form-urlencoded post data
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(cors_1.default());
    }
    mongoSetup() {
        mongoose_1.default.set('useNewUrlParser', true);
        mongoose_1.default.set('useFindAndModify', false);
        mongoose_1.default.set('useCreateIndex', true);
        mongoose_1.default.set('useUnifiedTopology', true);
        mongoose_1.default.connect(this.mongoUrl)
            .then((result) => {
            console.log(NAMESPACE, 'Connected to MongoDB');
        })
            .catch((err) => {
            console.log(NAMESPACE, err);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map