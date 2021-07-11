import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import Point from 'src/app/models/point';
import { PointService } from '@app/services/point.service';
import { AddPointDialog } from '../components/add-point-dialog';
import { EditPointDialog } from '../components/edit-point-dialog';
import { DeletePointDialog } from '../components/delete-point-dialog';

@Component({
  selector: 'app-point-view',
  templateUrl: './point-view.component.html',
  styleUrls: ['./point-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class PointViewComponent implements OnInit {
  columnsToDisplay = ['code', 'name', 'partOfEar', 'bodyPart', 'action'];
  expandedPoint: Point | null;
  points: Point[] = [];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private pointService: PointService
  ) { 
  }

  ngOnInit(): void {
    this.pointService.getPoints()
      .subscribe((points: Point[]) => this.points = points);
  }

  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddPointDialog, {
      width: '450px',
      disableClose: true,
      data: { title: "Add Point", point: new Point }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      this.pointService.createPoint(result)
      .subscribe(() => this.pointService.getPoints()
      .subscribe((points: Point[]) => this.points = points));
    });
  }

  openEditDialog(point: Point) {
    const dialogRef = this.dialog.open(EditPointDialog, {
      width: '450px',
      disableClose: true,
      data: { title: "Edit Point", point: point }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      this.pointService.updatePoint(result)
      .subscribe(() => this.pointService.getPoints()
      .subscribe((points: Point[]) => this.points = points));
    });  
  }

  openDeleteDialog(point: Point) {
    const dialogRef = this.dialog.open(DeletePointDialog, {
      width: '400px',
      disableClose: true,
      data: point
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pointService.deletePoint(point._id)
        .subscribe(() => this.points = this.points.filter(l => l._id != point._id));
      }
    });
  }
}