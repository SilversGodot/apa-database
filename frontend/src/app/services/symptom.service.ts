import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import Symptom from '../models/symptom';

@Injectable({
  providedIn: 'root'
})
export class SymptomService {

  constructor(private webService: WebService) { }

  getSymptoms() {
    return this.webService.get('symptoms');
  }

  createSymptom(symptom: Symptom) {
    return this.webService.post('symptoms', symptom);
  }

  getSymptom(symptomId: string) {
    return this.webService.get(`symptoms/${symptomId}`);
  }

  deleteSymptom(symptomId: string) {
    return this.webService.delete(`symptoms/${symptomId}`);
  }

  updateSymptom(symptom: Symptom) {
    return this.webService.patch(`symptoms/${symptom._id}`, symptom);
  }
}
