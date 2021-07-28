import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import EarZone from '../models/earZone';

@Injectable({
  providedIn: 'root'
})
export class EarZoneService {

  constructor(private webService: WebService) { }

  getEarZones() {
    return this.webService.get('earzone');
  }

  createEarZone(earZone: EarZone) {
    return this.webService.post('earzone', earZone);
  }

  getEarZone(earZoneId: string) {
    return this.webService.get(`earzone/${earZoneId}`);
  }

  deleteEarZone(earZoneId: string) {
    return this.webService.delete(`earzone/${earZoneId}`);
  }

  updateEarZone(earZone: EarZone) {
    return this.webService.patch(`earzone/${earZone._id}`, earZone);
  }
}