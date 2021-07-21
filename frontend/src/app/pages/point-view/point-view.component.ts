import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import Point from 'src/app/models/point';
import EarRegion from '@app/models/earRegion';
import { PointService } from '@app/services/point.service';
import { EarRegionService } from '@app/services/earRegion.service';
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
  dataSource: MatTableDataSource<Point>;
  earRegions: EarRegion[] = [];
  isLoading = true;

  // @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private pointService: PointService,
    private earRegionService: EarRegionService
  ) { 
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Point>([]);

    this.pointService.getPoints()
      .subscribe((points: Point[]) => {
        this.dataSource.data = points;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      });

    this.earRegionService.getEarRegions()
      .subscribe((earRegions: EarRegion[]) => this.earRegions = earRegions);
  }

  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddPointDialog, {
      width: '450px',
      disableClose: true,
      data: { title: "Add Point", point: new Point, earRegions: this.earRegions }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Add Point Dialog result: ${result}`);

      if(!result) {
        return;
      }

      let point: Point = new Point;
      point.code = result.code;
      point.name = result.name;
      point.partOfEar = result.partOfEar;
      point.bodyPart = result.bodyPart;
      point.function = result.function;

      this.pointService.createPoint(point)
      .subscribe(() => this.pointService.getPoints()
      .subscribe((points: Point[]) => this.dataSource.data = points));
    });
  }

  openEditDialog(point: Point) {
    const dialogRef = this.dialog.open(EditPointDialog, {
      width: '450px',
      disableClose: true,
      data: { title: "Edit Point", point: point, earRegions: this.earRegions }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Edit Point Dialog result: ${result}`);

      if(!result) {
        return;
      }

      point.code = result.code;
      point.name = result.name;
      point.partOfEar = result.partOfEar;
      point.bodyPart = result.bodyPart;
      point.function = result.function;

      this.pointService.updatePoint(point)
      .subscribe(() => this.pointService.getPoints()
      .subscribe((points: Point[]) => this.dataSource.data = points));
    });  
  }

  openDeleteDialog(point: Point) {
    const dialogRef = this.dialog.open(DeletePointDialog, {
      width: '400px',
      disableClose: true,
      data: point
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Delete Point Dialog result: ${result}`);

      if(result) {
        this.pointService.deletePoint(point._id)
        .subscribe(() => this.dataSource.data = this.dataSource.data.filter(l => l._id != point._id));
      }
    });
  }
}