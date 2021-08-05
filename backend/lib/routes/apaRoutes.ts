import { Router, Request, Response } from "express";
import { PointController } from "../controllers/pointController";
import { TreatmentController } from "../controllers/treatmentController";
import { SymptomController } from "../controllers/symptomController";
import { EarZoneController } from "../controllers/earZoneController";
import { UserController } from "../controllers/userController";
import { AuthController } from "../controllers/authController";

export class Routes {
    public router: Router;

    public pointController: PointController = new PointController();
    public treatmentController: TreatmentController = new TreatmentController();
    public symptomController: SymptomController = new SymptomController();
    public earZoneController: EarZoneController = new EarZoneController();
    public userController: UserController = new UserController();
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
    }

    public routes(app: any): void {
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfull!'
            })
        })

        /* Points CRUD */
        app.route('/points')
            .get(this.authController.authenticateJWT, this.pointController.getPoints)
            .post(this.authController.authenticateJWT, this.pointController.addPoint);
    
        app.route('/points/:pointId')
            .get(this.pointController.getPoint)
            .patch(this.authController.authenticateJWT, this.pointController.updatePoint)
            .delete(this.authController.authenticateJWT, this.pointController.deletePoint);

        /* Treatments CRUD */
        app.route('/treatments')
            .get(this.treatmentController.getTreatments)
            .post(this.authController.authenticateJWT, this.treatmentController.addTreatment);
            
        app.route('/treatments/:treatmentId')
            .get(this.treatmentController.getTreatment)
            .patch(this.authController.authenticateJWT, this.treatmentController.updateTreatment)
            .delete(this.authController.authenticateJWT, this.treatmentController.deleteTreatment);

        /* Symptoms CRUD */
        app.route('/symptoms')
            .get(this.symptomController.getSymptoms)
            .post(this.authController.authenticateJWT, this.symptomController.addSymptom);
            
        app.route('/symptoms/:symptomId')
            .get(this.symptomController.getSymptom)
            .patch(this.authController.authenticateJWT, this.symptomController.updateSymptom)
            .delete(this.authController.authenticateJWT, this.symptomController.deleteSymptom);

        /* EarZone CRUD */
        app.route('/earzone')
            .get(this.earZoneController.getEarZones)
            .post(this.authController.authenticateJWT, this.earZoneController.addEarZone);
                    
        app.route('/earzone/:earZoneId')
            .get(this.earZoneController.getEarZones)
            .patch(this.authController.authenticateJWT, this.earZoneController.updateEarZone)
            .delete(this.authController.authenticateJWT, this.earZoneController.deleteEarZone);

        /* User Login/Logout/Authenticate */
        app.route('/register')
            .post(this.userController.registerUser);

        app.route('/login')
            .post(this.userController.authenticateUser);           
    }
}