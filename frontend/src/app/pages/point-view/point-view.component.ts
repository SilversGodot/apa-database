import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import Point from 'src/app/models/point';
import { PointService } from 'src/app/point.service';
import { AddPointDialog } from '../components/add-point-dialog';
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

  // open(content: any) {
  //  this.modalService.open(content, this.modalOptions).result.then((result: Point) => {
  //    this.pointService.createPoint(result)
  //    .subscribe(() => this.pointService.getPoints()
  //    .subscribe((points: Point[]) => this.points = points));
  //  }, (reason) => {
  //    
  //  });
  // }

  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddPointDialog, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDeleteDialog(point: Point) {
    const dialogRef = this.dialog.open(DeletePointDialog, {
      width: '400px',
      // Can be closed only by clicking the close button
      disableClose: true,
      data: point
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log(point);
    });
  }

  addRowData(row_obj: Point){
    this.pointService.createPoint(row_obj)
      .subscribe((points: Point[]) => {
        this.pointService.getPoints();
      });
    this.table.renderRows();
  }

  updateRowData(row_obj: Point){
    // this.dataSource = this.dataSource.filter((value, key)=>{
    //  if(value.id == row_obj.id){
    //    value.name = row_obj.name;
    //  }
    //  return true;
    //});
  }

  deleteRowData(row_obj: Point){
    this.pointService.deletePoint(row_obj._id)
      .subscribe(() => this.points = this.points.filter(l => l._id != row_obj._id));
  }
}