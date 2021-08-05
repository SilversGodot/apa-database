import { Request, Response } from "express";
import { PointController } from "../controllers/pointController";
import { TreatmentController } from "../controllers/treatmentController";
import { SymptomController } from "../controllers/symptomController";
import { EarZoneController } from "../controllers/earZoneController";
import { UserController } from "../controllers/userController";
import { Auth } from "../passport/auth"

export class Routes {
    public pointController: PointController = new PointController();
    public treatmentController: TreatmentController = new TreatmentController();
    public symptomController: SymptomController = new SymptomController();
    public earZoneController: EarZoneController = new EarZoneController();
    public userController: UserController = new UserController();
    public auth: Auth = new Auth();

    public routes(app: any): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfull!'
            })
        })

        /* Points CRUD */
        app.route('/points')
            .get(this.auth.authenticateJWT, this.pointController.getPoints)
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

        /* EarZone CRUD */
        app.route('/earzone')
            .get(this.earZoneController.getEarZones)
            .post(this.earZoneController.addEarZone);
                    
        app.route('/earzone/:earZoneId')
            .get(this.earZoneController.getEarZones)
            .patch(this.earZoneController.updateEarZone)
            .delete(this.earZoneController.deleteEarZone);

        /* User CRUD */
        app.route('/users')
            .get(this.userController.getUsers)
            .post(this.userController.addUser);

        app.route('/signin')
            .post(this.userController.signIn);

        app.route('/signout')
            .get(this.userController.signOut);
        
        app.route('/currentUser')
            .get(this.userController.getCurrentUser);
            
    }
}