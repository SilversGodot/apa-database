import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
  modalOptions: NgbModalOptions;
  constructor(
    private pointService: PointService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { 
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }   
  }

  ngOnInit(): void {
    this.pointService.getPoints()
      .subscribe((points: Point[]) => this.points = points);
    
    this.route.params.subscribe((params: Params) => {
      this.pointId = params.pointId;
      if (!this.pointId) return;
      this.pointService.getPoint(this.pointId).subscribe((selectedPoint: Point) => this.selectedPoint = selectedPoint);
    });
  }

  addPoint(value: Point) {
    this.pointService.createPoint(value)
      .subscribe((points: Point[]) => {
        this.pointService.getPoints();
      });
  }

  deletePoint(point: Point) {
    this.pointService.deletePoint(point._id)
      .subscribe(() => this.points = this.points.filter(l => l._id != point._id));
  }

  open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result: Point) => {
      this.pointService.createPoint(result)
      .subscribe(() => this.pointService.getPoints()
      .subscribe((points: Point[]) => this.points = points));
    }, (reason) => {
      
    });
  }
}
