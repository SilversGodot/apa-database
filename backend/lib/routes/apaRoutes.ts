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
            .get(this.pointController.getPoints)
            .post(this.auth.authenticateJWT, this.pointController.addPoint);
    
        app.route('/points/:pointId')
            .get(this.pointController.getPoint)
            .patch(this.auth.authenticateJWT, this.pointController.updatePoint)
            .delete(this.auth.authenticateJWT, this.pointController.deletePoint);

        /* Treatments CRUD */
        app.route('/treatments')
            .get(this.treatmentController.getTreatments)
            .post(this.auth.authenticateJWT, this.treatmentController.addTreatment);
            
        app.route('/treatments/:treatmentId')
            .get(this.treatmentController.getTreatment)
            .patch(this.auth.authenticateJWT, this.auth.authenticateAdminJWT, this.treatmentController.updateTreatment)
            .delete(this.auth.authenticateJWT, this.auth.authenticateAdminJWT, this.treatmentController.deleteTreatment);

        /* Symptoms CRUD */
        app.route('/symptoms')
            .get(this.symptomController.getSymptoms)
            .post(this.auth.authenticateJWT, this.auth.authenticateAdminJWT, this.symptomController.addSymptom);
            
        app.route('/symptoms/:symptomId')
            .get(this.symptomController.getSymptom)
            .patch(this.auth.authenticateJWT, this.symptomController.updateSymptom)
            .delete(this.auth.authenticateJWT, this.symptomController.deleteSymptom);

        /* EarZone CRUD */
        app.route('/earzone')
            .get(this.earZoneController.getEarZones)
            .post(this.auth.authenticateJWT, this.earZoneController.addEarZone);
                    
        app.route('/earzone/:earZoneId')
            .get(this.earZoneController.getEarZones)
            .patch(this.auth.authenticateJWT, this.earZoneController.updateEarZone)
            .delete(this.auth.authenticateJWT, this.earZoneController.deleteEarZone);

        /* User Routes */
        app.route('/users')
            .get(this.userController.getUsers)
            .post(this.userController.addUser);
        
        app.route('/users/:userId')
            .get(this.userController.getUser);

        app.route('/signin')
            .post(this.userController.signIn);
        
        app.route('/account/:userId')
            .get(this.auth.authenticateJWT, this.userController.getCurrentUser);  
    }
}