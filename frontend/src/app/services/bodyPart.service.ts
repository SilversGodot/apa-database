import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import BodyPart from '../models/bodyPart';

@Injectable({
  providedIn: 'root'
})
export class BodyPartService {

  constructor(private webService: WebService) { }

  getBodyParts() {
    return this.webService.get('bodypart');
  }

  createEarRegion(bodyPart: BodyPart) {
    return this.webService.post('bodypart', bodyPart);
  }

  getEarRegion(bodyPartId: string) {
    return this.webService.get(`bodypart/${bodyPartId}`);
  }

  deletePoint(bodyPartId: string) {
    return this.webService.delete(`bodypart/${bodyPartId}`);
  }

  updatePoint(bodyPart: BodyPart) {
    return this.webService.patch(`bodypart/${bodyPart._id}`, bodyPart);
  }
}