import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';

import Treatment from 'src/app/models/treatment';
import { TreatmentService } from '@app/services/treatment.service';

@Component({
    selector: 'symptom-dialog',
    templateUrl: 'symptom-dialog.html'
})
export class SymptomDialog {
    selectable = true;
    removable = true;
    symptomForm: FormGroup;
    allTreatments: Treatment[] = [];

    filteredTreatments: Observable<Treatment[]>;

    treatmentCtrl = new FormControl();

    readOnlyMode = this.data.action === 'View';

    @ViewChild('treatmentInput') treatmentInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<SymptomDialog>,
        private treatmentService: TreatmentService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.filteredTreatments = this.treatmentCtrl.valueChanges.pipe(
            startWith(null as string),
            map((pointName: string | null) => pointName ? this._filter(pointName) : this.allTreatments.slice())
        );
    }

    ngOnInit() {
        this.symptomForm = this.formBuilder.group({
            _id: this.data.treatment._id,
            name: [this.data.treatment.name, Validators.required],
            description: this.data.treatment.description,
            treatments: this.treatmentCtrl
        });

        if (this.readOnlyMode) {
            this.treatmentCtrl.disable();
        }

        this.treatmentService.getTreatments()
            .subscribe((points: Treatment[]) => this.allTreatments = points);
    }

    private _filter(value: string): Treatment[] {
        const filterValue = value.toString().toLowerCase();
    
        return this.allTreatments.filter(point => point.name.toLowerCase().includes(filterValue));
    }
}