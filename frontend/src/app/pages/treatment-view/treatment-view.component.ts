import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Treatment from 'src/app/models/treatment';
import Point from 'src/app/models/point';
import { TreatmentPoint, pointType } from '@app/models/treatmentPoint';
import { TreatmentService } from '@app/services/treatment.service';
import { TreatmentDialog } from '../components/treatment-dialog';
import { DeleteDialog } from '../components/delete-dialog';

export interface ITreatmentViewModel {
  id: string;
  name: string;
  description: string;
  masterPoints: Point[];
  primaryPoints: Point[];
  supplementalPoints: Point[];
}

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
  dataSource: MatTableDataSource<ITreatmentViewModel>;
  columnsToDisplay = ['name', 'description', 'action'];
  expandedTreatment: Treatment | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private treatmentService: TreatmentService
  ) { 
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ITreatmentViewModel>([]);
    this.mapViewModel().subscribe(viewModel => { 
      this.dataSource.data = viewModel;
      this.dataSource.paginator = this.paginator;
    });
  }

  mapViewModel(): Observable<ITreatmentViewModel[]> {
    const viewModel =  this.treatmentService.getTreatments()
      .pipe(map((response: Treatment[]) => {
        let viewModels: ITreatmentViewModel[] = [];

        response.forEach((treatment) => {
          let viewModel: ITreatmentViewModel = {
            id: treatment._id,
            name: treatment.name,
            description: treatment.description,
            masterPoints: this.getPointsWithType(treatment.points, "master"),
            primaryPoints: this.getPointsWithType(treatment.points, "primary"),
            supplementalPoints: this.getPointsWithType(treatment.points, "supplemental")
          };

          viewModels.push(viewModel);
        });

        return viewModels;
    }));
    
    return viewModel;
  }

  openTreatmentDialog(treatmentViewModel: ITreatmentViewModel, action: string) {
    if (!treatmentViewModel) {
      treatmentViewModel = { id: null, name: '', description: '', masterPoints: [], primaryPoints: [], supplementalPoints: [] };
      action = 'Add';
    }

    const dialogRef = this.dialog.open(TreatmentDialog, {
      width: '500px',
      disableClose: true,
      data: { 
        action: action, 
        treatment: treatmentViewModel
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }

      var treatment: Treatment = {
        _id: treatmentViewModel.id,
        name: result.name,
        description: result.description,
        points: []
      };

      treatment.points = this.getTreatPointsWithType(result.masterPoints, pointType[pointType.master])
        .concat(this.getTreatPointsWithType(result.primaryPoints, pointType[pointType.primary]))
        .concat(this.getTreatPointsWithType(result.supplementalPoints, pointType[pointType.supplemental]));

      if (action === 'Add') {        
         this.treatmentService.createTreatment(treatment)
         .subscribe(() => this.mapViewModel()
          .subscribe(viewModel => this.dataSource.data = viewModel));
      } else if (action === 'Edit') {
         this.treatmentService.updateTreatment(treatment)
          .subscribe(() => this.mapViewModel()
            .subscribe(viewModel => this.dataSource.data = viewModel));
      }
    });
  }

  openDeleteDialog(treatmentViewModel: ITreatmentViewModel) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '400px',
      disableClose: true,
      data: {
        "type": "Treatment",
        "object": ` ${treatmentViewModel.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.treatmentService.deleteTreatment(treatmentViewModel.id)
          .subscribe(() => this.mapViewModel()
            .subscribe(viewModel => this.dataSource.data = viewModel));
      }
    });
  }

  private getPointsWithType(treatPoints: any[], type: string): Point[] {
    const points = [];

    for (let treatPoint of treatPoints) {
      // skip delete points
      if(!treatPoint.isDeleted && treatPoint.type == type) {
        points.push(treatPoint.point);
      }
    }

    return points;
  }

  private getTreatPointsWithType(points: Point[], type: string): TreatmentPoint[] {
    const treatPoints = [];
    points.forEach((point) => treatPoints.push({ point: point, type: type }));

    return treatPoints;
  }
}