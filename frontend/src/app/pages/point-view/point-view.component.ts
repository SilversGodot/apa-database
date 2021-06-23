import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import Point from 'src/app/models/point';
import { PointService } from 'src/app/point.service';

@Component({
  selector: 'app-point-view',
  templateUrl: './point-view.component.html',
  styleUrls: ['./point-view.component.css']
})
export class PointViewComponent implements OnInit {
  points: Point[] = [];
  selectedPoint: Point;
  pointId: string;
  constructor(
    private pointService: PointService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pointService.getPoints()
      .subscribe((points: Point[]) => this.points = points);
    
    this.route.params.subscribe((params: Params) => {
      this.pointId = params.pointId;
      if (!this.pointId) return;
      this.pointService.getPoint(this.pointId).subscribe((selectedPoint: Point) => this.selectedPoint = selectedPoint);
    });
  }

  deletePoint(point: Point) {
    this.pointService.deletePoint(point._id)
      .subscribe(() => this.points = this.points.filter(l => l._id != point._id));
  }
}
