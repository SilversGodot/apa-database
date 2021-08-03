import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import Point from 'src/app/models/point';
import { TreatmentPoint, pointType } from '@app/models/treatmentPoint';
import { PointService } from '@app/services/point.service';

@Component({
    selector: 'treatment-dialog',
    templateUrl: 'treatment-dialog.html',
    styleUrls: ['dialog.css']
})
export class TreatmentDialog {
    selectable = true;
    readOnlyMode = this.data.action === 'View';
    treatmentForm: FormGroup;
    allPoints: Point[] = [];
    masterPoints: Point[] = [];
    primaryPoints: Point[] = [];
    supplementalPoints: Point[] = [];
    earPointList = [];

    filteredMasterPoints: Observable<Point[]>;
    filteredPrimaryPoints: Observable<Point[]>;
    filteredSupplementalPoints: Observable<Point[]>;

    masterPointsCtrl = new FormControl();
    primaryPointsCtrl = new FormControl();
    supplementalPointsCtrl = new FormControl();

    @ViewChild('masterPointInput') masterPointInput: ElementRef<HTMLInputElement>;
    @ViewChild('primaryPointInput') primaryPointInput: ElementRef<HTMLInputElement>;
    @ViewChild('supplementalPointInput') supplementalPointInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<TreatmentDialog>,
        private pointService: PointService,
        @Inject(MAT_DIALOG_DATA) public data: any,
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
            _id: this.data.treatment.id,
            name: [this.data.treatment.name, Validators.required],
            description: this.data.treatment.description,
            masterPoints: this.masterPointsCtrl,
            primaryPoints: this.primaryPointsCtrl,
            supplementalPoints: this.supplementalPointsCtrl
        });

        this.masterPoints = this.data.treatment.masterPoints;
        this.primaryPoints = this.data.treatment.primaryPoints;
        this.supplementalPoints = this.data.treatment.supplementalPoints;

        if (this.readOnlyMode) {
            this.masterPointsCtrl.disable();
            this.primaryPointsCtrl.disable();
            this.supplementalPointsCtrl.disable();
        }

        this.pointService.getPoints()
            .subscribe((points: Point[]) => this.allPoints = points);
        this._generateEarPoints();
    }

    addPoint(event: MatChipInputEvent, type: pointType): void {
        const value = (event.value || '').trim();

        if (value) {    
            const result = this.allPoints.find(point => point.name === value);

            if (result) {
                switch(type) {
                    case pointType.master:
                        this.masterPoints.push(result);
                        break;

                    case pointType.primary:
                        this.primaryPoints.push(result);
                        break;

                    case pointType.supplemental:
                        this.supplementalPoints.push(result);
                        break;
                }
            }
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    removePoint(value: Point, type: pointType): void {
        let index = -1;

        switch (type) {
            case pointType.master:
                index = this.masterPoints.indexOf(value);
                if (index >= 0) {
                    this.masterPoints.splice(index, 1);
                }
                break;

            case pointType.primary:
                index = this.primaryPoints.indexOf(value);
                if (index >= 0) {
                    this.primaryPoints.splice(index, 1);
                }                
                break;

            case pointType.supplemental:
                index = this.supplementalPoints.indexOf(value);
                if (index >= 0) {
                    this.supplementalPoints.splice(index, 1);
                }                     
                break;
        }
    }

    selectedPoint(event: MatAutocompleteSelectedEvent, type: pointType): void {
        const result = this.allPoints.find(point => point.name === event.option.viewValue);

        switch (type) {
            case pointType.master:
                this.masterPoints.push(result);
                this.masterPointInput.nativeElement.value = ' ';
                break;

            case pointType.primary:
                this.primaryPoints.push(result);
                this.primaryPointInput.nativeElement.value=' ';                
                break;

            case pointType.supplemental:
                this.supplementalPoints.push(result);
                this.supplementalPointInput.nativeElement.value=' ';                    
                break;
        }
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

    private _generateEarPoints() {
        this.masterPoints.forEach((element) => {
            this.earPointList.push({
                name: element.name, 
                type: "TreamtPoint", 
                coord: { x: element.location.x, y: element.location.y, z: 0 }
            });
        });

        this.primaryPoints.forEach((element) => {
            this.earPointList.push({
                name: element.name, 
                type: "TreamtPoint", 
                coord: { x: element.location.x, y: element.location.y, z: 0 }
            });
        });

        this.supplementalPoints.forEach((element) => {
            this.earPointList.push({
                name: element.name, 
                type: "TreamtPoint", 
                coord: { x: element.location.x, y: element.location.y, z: 0 }
            });
        });
    }
}