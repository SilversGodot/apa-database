import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import Treatment from '../models/treatment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(private webService: WebService) { }

  getTreatments() {
    return this.webService.get<Treatment[]>('treatments');
  }

  createTreatment(treatment: Treatment) {
    return this.webService.post('treatments', treatment);
  }

  getTreatment(treatmentId: string) {
    return this.webService.get(`treatments/${treatmentId}`);
  }

  deleteTreatment(treatmentId: string) {
    return this.webService.delete(`treatments/${treatmentId}`);
  }

  updateTreatment(treatment: Treatment) {
    return this.webService.patch(`treatments/${treatment._id}`, treatment);
  }
}
