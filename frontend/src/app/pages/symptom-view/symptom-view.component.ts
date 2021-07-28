import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import Treatment from 'src/app/models/treatment';
import Symptom from 'src/app/models/symptom';
import { SymptomService } from '@app/services/symptom.service';

import { SymptomDialog } from '../components/symptom-dialog';

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

    openSymptomDialog(symptom: Symptom, action: string) {
      	if (!symptom) {
        	symptom = new Symptom();
        	action = 'Add';
      	}

      	const dialogRef = this.dialog.open(SymptomDialog, {
        	width: '500px',
        	disableClose: true,
        	data: { 
          		action: action, 
          		symptom: symptom
        	}
	  	});
		
		dialogRef.afterClosed().subscribe(result => {
			if (!result) {
				return;
			}

			let newSymptom = new Symptom();
			newSymptom._id = result._id;
			newSymptom.name = result._id;
			newSymptom.description = result.description;
			
			for (let treatmentId of result.treatments) {

			}

			console.log(newSymptom);
			if (action==='Add') {

			}
			else if (action==='Edit') {

			}
		});
    }

    openDeleteDialog(symptom: Symptom) {

    }

}
