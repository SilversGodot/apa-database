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
    treatments: Treatment[] = [];
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
            _id: this.data.symptom._id,
            name: [this.data.symptom.name, Validators.required],
            description: this.data.symptom.description,
            treatments: this.treatmentCtrl
        });

        if (this.readOnlyMode) {
            this.treatmentCtrl.disable();
        }

        for (let treatment of this.data.symptom.treatments) {
            this.treatments.push(treatment);
        }

        this.treatmentService.getTreatments()
            .subscribe((points: Treatment[]) => this.allTreatments = points);
    }

    submit() {
        if (this.symptomForm.invalid) {
            return;
        }

        this.treatmentCtrl.setValue(this.treatments);
        this.dialogRef.close(this.symptomForm.value);
    }

    addTreatment(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
    
        if (value) {
            const result = this.allTreatments.filter(treatment => treatment.name===value);
            if (result[0]) {
                this.treatments.push(result[0]);
                console.log(result[0]);
            }
        }
    
        // Clear the input value
        event.chipInput!.clear();
    }

    selectedTreatment(event: MatAutocompleteSelectedEvent): void {
        const result = this.allTreatments.filter(point => point.name===event.option.viewValue);
        this.treatments.push(result[0]);
        this.treatmentInput.nativeElement.value='';
    }

    removeTreatment(value: Treatment): void {
        const index = this.treatments.indexOf(value);
    
        if (index >= 0) {
          this.treatments.splice(index, 1);
        }
    }

    private _filter(value: string): Treatment[] {
        const filterValue = value.toString().toLowerCase();
    
        return this.allTreatments.filter(point => point.name.toLowerCase().includes(filterValue));
    }
}