import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import Point from './models/point';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private webService: WebService) { }

  getPoints() {
    return this.webService.get('points');
  }

  createPoint(point: Point) {
    return this.webService.post('points', point);
  }

  getPoint(pointId: string) {
    return this.webService.get(`points/${pointId}`);
  }

  deletePoint(pointId: string) {
    return this.webService.delete(`points/${pointId}`);
  }
}
