import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import Treatment from 'src/app/models/treatment';
import { TreatmentPoint, pointType } from '@app/models/treatmentPoint';
import { TreatmentService } from '@app/services/treatment.service';
import { TreatmentDialog } from '../components/treatment-dialog';
import { DeleteDialog } from '../components/delete-dialog';

@Component({
  selector: 'app-treatment-view',
  templateUrl: './treatment-view.component.html',
  styleUrls: ['./treatment-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TreatmentViewComponent implements OnInit {
  dataSource: MatTableDataSource<Treatment>;
  columnsToDisplay = ['name', 'points', 'action'];
  expandedTreatment: Treatment | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private treatmentService: TreatmentService
  ) { 
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Treatment>([]);

    this.treatmentService.getTreatments()
      .subscribe((treatments: Treatment[]) => {
        this.dataSource.data = treatments;
        this.dataSource.paginator = this.paginator;
      });
  }

  openTreatmentDialog(treatment: Treatment, action: string) {
    if (!treatment) {
      treatment = new Treatment();
      treatment.points = [];
      action = 'Add';
    }

    const dialogRef = this.dialog.open(TreatmentDialog, {
      width: '500px',
      disableClose: true,
      data: { 
        action: action, 
        treatment: treatment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }

      treatment.name = result.name;
      treatment.description = result.description;
      treatment.points = this.getTreatPointsWithType(result.masterPoints, 'master')
        .concat(this.getTreatPointsWithType(result.primaryPoints, 'primary'))
        .concat(this.getTreatPointsWithType(result.supplementalPoints, 'supplemental'));

      if (action === 'Add') {        
        this.treatmentService.createTreatment(treatment)
        .subscribe(() => this.treatmentService.getTreatments()
          .subscribe((treatments: Treatment[]) => this.dataSource.data = treatments));
      } else if (action === 'Edit') {
        console.log(treatment);
        this.treatmentService.updateTreatment(treatment)
        .subscribe(
          () => this.treatmentService.getTreatments()
            .subscribe((treatments: Treatment[]) => this.dataSource.data = treatments),
          error => console.log('Update fail: ', error)
        );
      }
    });
  }

  openDeleteDialog(treatment: Treatment) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '400px',
      disableClose: true,
      data: {
        "type": "Treatment",
        "object": ` ${treatment.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.treatmentService.deleteTreatment(treatment._id)
        .subscribe(() => this.treatmentService.getTreatments()
          .subscribe((treatments: Treatment[]) => this.dataSource.data = treatments));
      }
    });
  }

  private getTreatPointsWithType(points: any, type: string): TreatmentPoint[] {
    const treatmentPoints = [];

    for (let point of points) {
      // skip delete points
      if(!point.isDeleted) {
        treatmentPoints.push({point: point.point._id, type: type});
      }
    }

    return treatmentPoints;
  }
}