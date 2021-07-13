import { Request, Response } from "express";
import { PointController } from "../controllers/pointController";
import { TreatmentController } from "../controllers/treatmentController";
import { SymptomController } from "../controllers/symptomController";
import { EarRegionController } from "../controllers/earRegionController";
import { BodyPartController } from "../controllers/bodyPartController";

export class Routes {
    public pointController: PointController = new PointController();
    public treatmentController: TreatmentController = new TreatmentController();
    public symptomController: SymptomController = new SymptomController();
    public earRegionController: EarRegionController = new EarRegionController();
    public bodyPartController: BodyPartController = new BodyPartController();

    public routes(app: any): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfull!'
            })
        })

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
        app.route('/symptoms')
        .get(this.symptomController.getSymptoms)
        .post(this.symptomController.addSymptom);
            
        app.route('/symptoms/:symptomId')
        .get(this.symptomController.getSymptom)
        .patch(this.symptomController.updateSymptom)
        .delete(this.symptomController.deleteSymptom);

        /* Ear Region CRUD */
        app.route('/earregion')
        .get(this.earRegionController.getEarRegions)
        .post(this.earRegionController.addEarRegion);
            
        app.route('/earregion/:earregionId')
        .get(this.earRegionController.getEarRegion)
        .patch(this.earRegionController.updateEarRegion)
        .delete(this.earRegionController.deleteEarRegion);

        /* Body Part CRUD */
        app.route('/bodypart')
        .get(this.bodyPartController.getBodyParts)
        .post(this.bodyPartController.addBodyPart);
            
        app.route('/bodypart/:bodypartId')
        .get(this.bodyPartController.getBodyPart)
        .patch(this.bodyPartController.updateBodyPart)
        .delete(this.bodyPartController.deleteBodyPart);
    }
}