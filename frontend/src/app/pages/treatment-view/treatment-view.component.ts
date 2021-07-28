import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import Treatment from 'src/app/models/treatment';
import { TreatmentService } from '@app/services/treatment.service';
import { TreatmentDialog } from '../components/treatment-dialog';
import { DeleteDialog } from '../components/delete-dialog';
import { stringify } from '@angular/compiler/src/util';

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

      let newTreatment: any = {
        _id: '',
        name: '',
        description: '',
        points: []
      };
      newTreatment._id = result._id;
      newTreatment.name = result.name;
      newTreatment.description = result.description;
      for (let point of result.masterPoints) {
        let newTreatmentPoint: any = {
          point: '',
          type: ''
        };
        newTreatmentPoint.point = point._id;
        newTreatmentPoint.type = 'master';
        newTreatment.points.push(newTreatmentPoint);
      }
      for (let point of result.primaryPoints) {
        let newTreatmentPoint: any = {
          point: '',
          type: ''
        };
        newTreatmentPoint.point = point._id;
        newTreatmentPoint.type = 'primary';
        newTreatment.points.push(newTreatmentPoint);
      }
      for (let point of result.supplementalPoints) {
        let newTreatmentPoint: any = {
          point: '',
          type: ''
        };
        newTreatmentPoint.point = point._id;
        newTreatmentPoint.type = 'supplemental';
        newTreatment.points.push(newTreatmentPoint);
      }

      console.log(newTreatment);
      
      if (action==='Add') {
        this.treatmentService.createTreatment(newTreatment)
        .subscribe(() => this.treatmentService.getTreatments()
          .subscribe((treatments: Treatment[]) => this.dataSource.data = treatments));
      }
      else if (action==='Edit') {
        this.treatmentService.updateTreatment(newTreatment)
        .subscribe(() => this.treatmentService.getTreatments()
          .subscribe((treatments: Treatment[]) => this.dataSource.data = treatments));
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
      console.log(`Delete Point Dialog result: ${result}`);

      if(result) {
        this.treatmentService.deleteTreatment(treatment._id)
        .subscribe(() => this.treatmentService.getTreatments()
          .subscribe((treatments: Treatment[]) => this.dataSource.data = treatments));
      }
    });
  }
}