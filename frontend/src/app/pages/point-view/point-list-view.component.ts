import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import Point from 'src/app/models/point';
import { PointService } from '@app/services/point.service';
import { PointDialog } from '../components/point-dialog';
import { DeleteDialog } from '../components/delete-dialog';

import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'point-list-view',
  templateUrl: './point-list-view.component.html',
  styleUrls: ['./point-list-view.component.css']
})
export class PointListViewComponent implements OnInit {
  columnsToDisplay = ['code', 'name', 'alias', 'chineseEarZones', 'europeanEarZones', 'action'];
  dataSource: MatTableDataSource<Point>;
  isLoading = true;
  isAuthenticated = false;
  userRole = 'guest';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private pointService: PointService
  ) { 
  }

  ngOnInit(): void {
    this.isAuthenticated = this.accountService.isAuthenticated().valueOf();
    this.userRole = this.accountService.getUserRole();
    this.dataSource = new MatTableDataSource<Point>([]);
    
    this.pointService.getPoints()
      .subscribe((points: Point[]) => {
        points.forEach(point => {
          point.chineseEarZoneString = point.chineseEarZones
            .map(function(zone) { 
              return zone.name 
            }).join(" - ");
        });

        this.dataSource.data = points.sort((n1,n2) => {
          if (Number(n1.code) > Number(n2.code)) {
            return 1;
          }
      
          if (Number(n1.code) < Number(n2.code)) {
            return -1;
          }
      
          return 0;
        });

      this.dataSource.paginator = this.paginator;
      this.isLoading = false;

      //// sorting data must after get the datasource or sorting won't work. 
      this.dataSource.sort = this.sort;
    });
  }

  openPointDialog(point: Point, action: string, authenticated: boolean) {
    if(!point)
    {
      point = new Point();
      point.location = { "x": 1, "y": 1, "z": 0 };
      action = "AddPoint";
    }

    const dialogRef = this.dialog.open(PointDialog, {
      width: '600px',
      disableClose: true,
      data: { 
        action: action, 
        point: point,
        authenticated: this.isAuthenticated
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }

      if(action === "AddPoint"){        
        let newpoint: Point = new Point;
        newpoint.code = result.code;
        newpoint.name = result.name;
        newpoint.earAnatomy = result.earAnatomy;
        newpoint.function = result.function;
        newpoint.videoLink = result.videoLink;
        newpoint.location = {"x": result.xCoord, "y": result.yCoord, "z": 0};
  
        this.pointService.createPoint(newpoint)
        .subscribe(() => this.pointService.getPoints()
        .subscribe((points: Point[]) => this.dataSource.data = points));

        this.openSnackBar(newpoint.name + " added.", "Dismiss");
      } else if(action === "EditPoint") {
        point.code = result.code;
        point.name = result.name;
        point.earAnatomy = result.earAnatomy;
        point.function = result.function;
        point.videoLink = result.videoLink;
        point.location = {"x": result.xCoord, "y": result.yCoord, "z": 0};
  
        this.pointService.updatePoint(point)
        .subscribe(() => {
          this.pointService.getPoints()
            .subscribe((points: Point[]) => this.dataSource.data = points);
            this.openSnackBar(point.name + " updated.", "Dismiss");
        });
      }
    });  
  }

  openDeleteDialog(point: Point) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '400px',
      disableClose: true,
      data: {
        "type": "Point",
        "object": ` ${point.code} (${point.name})`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.pointService.deletePoint(point._id)
          .subscribe(
            res => {
              this.dataSource.data = this.dataSource.data.filter(l => l._id != point._id);
              this.openSnackBar(point.name + " deleted.", "Dismiss");
            }, 
            err => {
              console.log(err);
              this.openSnackBar("Oops!" + point.name + " delete fail.", "Dismiss");
            }
          );
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }
}