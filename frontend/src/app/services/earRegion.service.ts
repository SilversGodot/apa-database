import { Injectable } from '@angular/core';
import { WebService } from '../web.service';
import EarRegion from '../models/earRegion';

@Injectable({
  providedIn: 'root'
})
export class EarRegionService {

  constructor(private webService: WebService) { }

  getEarRegions() {
    return this.webService.get('earregion');
  }

  createEarRegion(earRegion: EarRegion) {
    return this.webService.post('earregion', earRegion);
  }

  getEarRegion(earRegionId: string) {
    return this.webService.get(`earregion/${earRegionId}`);
  }

  deleteEarRegion(earRegionId: string) {
    return this.webService.delete(`earregion/${earRegionId}`);
  }

  updateEarRegion(earRegion: EarRegion) {
    return this.webService.patch(`earregion/${earRegion._id}`, earRegion);
  }
}