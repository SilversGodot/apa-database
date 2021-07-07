import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import Point from 'src/app/models/point';
import { PointService } from 'src/app/point.service';

@Component({
  selector: 'app-point-view',
  templateUrl: './point-view.component.html',
  styleUrls: ['./point-view.component.css']
})
export class PointViewComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'partOfEar', 'bodyPart', 'function', 'action'];
  points: Point[] = [];
  modalOptions: NgbModalOptions;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private pointService: PointService,
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

  openDialog(action, obj) {
    obj.action = action;
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
