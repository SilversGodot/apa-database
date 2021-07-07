"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const pointController_1 = require("../controllers/pointController");
const treatmentController_1 = require("../controllers/treatmentController");
const symptomController_1 = require("../controllers/symptomController");
class Routes {
    constructor() {
        this.pointController = new pointController_1.PointController();
        this.treatmentController = new treatmentController_1.TreatmentController();
        this.symptomController = new symptomController_1.SymptomController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfull!'
            });
        });
        /* Points CRUD */
        app.route('/points')
            .get(this.pointController.getPoints)
            .post(this.pointController.addPoint);
        app.route('/points/:pointId')
            .get(this.pointController.getPoint)
            .patch(this.pointController.updatePoint)
            .delete(this.pointController.deletePoint);
        /* Treatments CRUD */
        app.route('/treatments')
            .get(this.treatmentController.getTreatments)
            .post(this.treatmentController.addTreatment);
        app.route('/treatments/:treatmentId')
            .get(this.treatmentController.getTreatment)
            .patch(this.treatmentController.updateTreatment)
            .delete(this.treatmentController.deleteTreatment);
        /* Symptoms CRUD */
        app.route('/treatments')
            .get(this.symptomController.getSymptoms)
            .post(this.symptomController.addSymptom);
        app.route('/treatments/:treatmentId')
            .get(this.symptomController.getSymptom)
            .patch(this.symptomController.updateSymptom)
            .delete(this.symptomController.deleteSymptom);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=apaRoutes.js.map