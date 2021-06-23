import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import Point from 'src/app/models/point';
import { PointService } from 'src/app/point.service';

@Component({
  selector: 'app-new-point',
  templateUrl: './new-point.component.html',
  styleUrls: ['./new-point.component.css']
})
export class NewPointComponent implements OnInit {

  constructor(
    private taskService: PointService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addPoint(value: Point) {
    this.taskService.createPoint(value)
      .subscribe((point: Point) => this.router.navigate(['/points', point._id]));
  }

}
