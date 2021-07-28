import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import Treatment from 'src/app/models/treatment';
import Symptom from 'src/app/models/symptom';
import { SymptomService } from '@app/services/symptom.service';

@Component({
    selector: 'app-symptom-view',
    templateUrl: './symptom-view.component.html',
    styleUrls: ['./symptom-view.component.css'],
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ]
})

export class SymptomViewComponent implements OnInit {
    dataSource: MatTableDataSource<Symptom>;
    columnsToDisplay = ['name', 'description', 'action'];
    expandedSymptom: Symptom | null;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        public dialog: MatDialog,
        private symptomService: SymptomService
    ) {}

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource<Symptom>([]);

        this.symptomService.getSymptoms()
        .subscribe((symptoms: Symptom[]) => {
          this.dataSource.data = symptoms;
          this.dataSource.paginator = this.paginator;
        });
    }

    openSymptomDialog(symptom: Symptom) {

    }

    openDeleteDialog(symptom: Symptom) {

    }

}
