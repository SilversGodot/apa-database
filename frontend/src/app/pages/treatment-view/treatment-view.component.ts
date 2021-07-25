import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import Treatment from 'src/app/models/treatment';
import { TreatmentService } from '@app/services/treatment.service';
import { AddTreatmentDialog } from '../components/add-treatment-dialog';
import { EditTreatmentDialog } from '../components/edit-treatment-dialog';
import { DeleteDialog } from '../components/delete-dialog';

import Point from '@app/models/point';
import TreatmentPoint from '@app/models/treatmentPoint';

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
  columnsToDisplay = ['name', 'points', 'action'];
  expandedTreatment: Treatment | null;
  treatments: Treatment[] = [];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private treatmentService: TreatmentService
  ) { 
  }

  ngOnInit(): void {
    this.treatmentService.getTreatments()
      .subscribe((treatments: Treatment[]) => this.treatments = treatments);
  }

  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddTreatmentDialog, {
      width: '450px',
      disableClose: true,
      data: {
        title: "Add Treatment"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }

      let newTreatment: any = {
        name: '',
        description: '',
        points: []
      };
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
      
      this.treatmentService.createTreatment(newTreatment)
        .subscribe(() => this.treatmentService.getTreatments()
          .subscribe((treatments: Treatment[]) => this.treatments = treatments));
    });
  }

  openEditDialog(treatment: Treatment) {
    const dialogRef = this.dialog.open(EditTreatmentDialog, {
      width: '500px',
      disableClose: true,
      data: { 
        title: "Edit Treatment",
        treatment: treatment,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }
      let editedTreatment: any = {
        _id: '',
        name: '',
        description: '',
        points: []
      };
      editedTreatment._id = result._id;
      editedTreatment.name = result.name;
      editedTreatment.description = result.description;
      for (let point of result.masterPoints) {
        let newTreatmentPoint: any = {
          point: '',
          type: ''
        };
        newTreatmentPoint.point = point._id;
        newTreatmentPoint.type = 'master';
        editedTreatment.points.push(newTreatmentPoint);
      }
      for (let point of result.primaryPoints) {
        let newTreatmentPoint: any = {
          point: '',
          type: ''
        };
        newTreatmentPoint.point = point._id;
        newTreatmentPoint.type = 'primary';
        editedTreatment.points.push(newTreatmentPoint);
      }
      for (let point of result.supplementalPoints) {
        let newTreatmentPoint: any = {
          point: '',
          type: ''
        };
        newTreatmentPoint.point = point._id;
        newTreatmentPoint.type = 'supplemental';
        editedTreatment.points.push(newTreatmentPoint);
      }
      
      this.treatmentService.updateTreatment(editedTreatment)
        .subscribe(() => this.treatmentService.getTreatments()
          .subscribe((treatments: Treatment[]) => this.treatments = treatments));
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
          .subscribe((treatments: Treatment[]) => this.treatments = treatments));
      }
    });
  }
}