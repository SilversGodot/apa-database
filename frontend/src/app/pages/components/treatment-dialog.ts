import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';

import Point from 'src/app/models/point';
import { PointService } from '@app/services/point.service';

@Component({
    selector: 'treatment-dialog',
    templateUrl: 'treatment-dialog.html'
})
export class TreatmentDialog {
    selectable = true;
    removable = true;
    treatmentForm: FormGroup;
    allPoints: Point[] = [];
    masterPoints: Point[] = [];
    primaryPoints: Point[] = [];
    supplementalPoints: Point[] = [];

    filteredMasterPoints: Observable<Point[]>;
    filteredPrimaryPoints: Observable<Point[]>;
    filteredSupplementalPoints: Observable<Point[]>;

    masterPointsCtrl = new FormControl();
    primaryPointsCtrl = new FormControl();
    supplementalPointsCtrl = new FormControl();

    readOnlyMode = this.data.action === 'View';
    
    @ViewChild('masterPointInput') masterPointInput: ElementRef<HTMLInputElement>;
    @ViewChild('primaryPointInput') primaryPointInput: ElementRef<HTMLInputElement>;
    @ViewChild('supplementalPointInput') supplementalPointInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<TreatmentDialog>,
        private pointService: PointService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.filteredMasterPoints = this.masterPointsCtrl.valueChanges.pipe(
            startWith(null as string),
            map((pointName: string | null) => pointName ? this._filter(pointName) : this.allPoints.slice())
        );
        this.filteredPrimaryPoints = this.primaryPointsCtrl.valueChanges.pipe(
            startWith(null as string),
            map((pointName: string | null) => pointName ? this._filter(pointName) : this.allPoints.slice())
        );
        this.filteredSupplementalPoints = this.supplementalPointsCtrl.valueChanges.pipe(
            startWith(null as string),
            map((pointName: string | null) => pointName ? this._filter(pointName) : this.allPoints.slice())
        );
    }
    
    ngOnInit() {
        this.treatmentForm = this.formBuilder.group({
            _id: this.data.treatment._id,
            name: [this.data.treatment.name, Validators.required],
            description: this.data.treatment.description,
            masterPoints: this.masterPointsCtrl,
            primaryPoints: this.primaryPointsCtrl,
            supplementalPoints: this.supplementalPointsCtrl
        });

        for (let treatmentPoint in this.data.treatment.points) {
            if(this.data.treatment.points[treatmentPoint].type==='master') {
                this.masterPoints.push(this.data.treatment.points[treatmentPoint].point);
            }
            if(this.data.treatment.points[treatmentPoint].type==='primary') {
                this.primaryPoints.push(this.data.treatment.points[treatmentPoint].point);
            }
            if(this.data.treatment.points[treatmentPoint].type==='supplemental') {
                this.supplementalPoints.push(this.data.treatment.points[treatmentPoint].point);
            }
        };

        if (this.readOnlyMode) {
            this.masterPointsCtrl.disable();
            this.primaryPointsCtrl.disable();
            this.supplementalPointsCtrl.disable();
        }

        this.pointService.getPoints()
            .subscribe((points: Point[]) => this.allPoints = points);
    }

    addMasterPoint(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
    
        if (value) {
            const result = this.allPoints.filter(point => point.name===value);
            if (result[0]) {
                this.masterPoints.push(result[0]);
            }
        }
    
        // Clear the input value
        event.chipInput!.clear();
    }

    removeMasterPoint(value: Point): void {
        const index = this.masterPoints.indexOf(value);
    
        if (index >= 0) {
          this.masterPoints.splice(index, 1);
        }
    }

    selectedMasterPoint(event: MatAutocompleteSelectedEvent): void {
        const result = this.allPoints.filter(point => point.name===event.option.viewValue);
        this.masterPoints.push(result[0]);
        this.masterPointInput.nativeElement.value='';
    }

    addPrimaryPoint(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
    
        if (value) {
            const result = this.allPoints.filter(point => point.name===value);
            if (result[0]) {
                this.primaryPoints.push(result[0]);
            }
        }
    
        // Clear the input value
        event.chipInput!.clear();
    }

    removePrimaryPoint(value: Point): void {
        const index = this.primaryPoints.indexOf(value);
    
        if (index >= 0) {
          this.primaryPoints.splice(index, 1);
        }
    }

    selectedPrimaryPoint(event: MatAutocompleteSelectedEvent): void {
        const result = this.allPoints.filter(point => point.name===event.option.viewValue);
        this.primaryPoints.push(result[0]);
        this.primaryPointInput.nativeElement.value='';
    }

    addSupplementalPoint(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
    
        if (value) {
            const result = this.allPoints.filter(point => point.name===value);
            if (result[0]) {
                this.supplementalPoints.push(result[0]);
            }
        }
    
        // Clear the input value
        event.chipInput!.clear();
    }

    removeSupplementalPoint(value: Point): void {
        const index = this.supplementalPoints.indexOf(value);
    
        if (index >= 0) {
          this.supplementalPoints.splice(index, 1);
        }
    }

    selectedSupplementalPoint(event: MatAutocompleteSelectedEvent): void {
        const result = this.allPoints.filter(point => point.name===event.option.viewValue);
        this.supplementalPoints.push(result[0]);
        this.supplementalPointInput.nativeElement.value='';
    }

    closeDialog() {
        this.dialogRef.close(); 
    }

    submit() {
        if (this.treatmentForm.invalid) {
            return;
        }

        this.masterPointsCtrl.setValue(this.masterPoints);
        this.primaryPointsCtrl.setValue(this.primaryPoints);
        this.supplementalPointsCtrl.setValue(this.supplementalPoints);
        this.dialogRef.close(this.treatmentForm.value);
    }

    private _filter(value: string): Point[] {
        const filterValue = value.toString().toLowerCase();
    
        return this.allPoints.filter(point => point.name.toLowerCase().includes(filterValue));
    }
}