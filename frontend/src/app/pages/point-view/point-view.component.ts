import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import Point from 'src/app/models/point';
import EarZone from '@app/models/earZone';

import { PointService } from '@app/services/point.service';
import { EarZoneService } from '@app/services/earZone.service';

@Component({
  selector: 'point-view',
  templateUrl: './point-view.component.html',
  styleUrls: ['./point-view.component.css']
})
export class PointViewComponent implements OnInit {
    pointForm: FormGroup;
    earZone_zh = new FormControl();
    earZone_eu = new FormControl();

    point: Point;  
    readOnlyMode = false;
    selectable = true;
    isLoading = true;
    earZones: EarZone[] = [];
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredEarZones: Observable<EarZone[]>;

    @ViewChild('earZonesChineseInput') earZonesChineseInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private pointService: PointService,
        private earZoneService: EarZoneService,
        private location: Location
    ) { 
        this.filteredEarZones = this.earZone_zh.valueChanges
        .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.earZones.slice())
        );
    }

    ngOnInit(): void {
        let pointId = this.route.snapshot.paramMap.get('pointId');

        this.pointService.getPoint(pointId)
            .subscribe((point: Point) => {
            this.point = point;
            this.initForm();
            this.isLoading = false;
        });

        this.earZoneService.getEarZones()
            .subscribe((earZones: EarZone[]) => this.earZones = earZones);
    }

    initForm() {
        this.pointForm = this.formBuilder.group({
            name: [{ value: this.point.name, disabled: this.readOnlyMode }, Validators.required],
            alias: { value: this.point.alias, disabled: this.readOnlyMode },
            earAnatomy: { value: this.point.earAnatomy, disabled: this.readOnlyMode },
            function: { value: this.point.function, disabled: this.readOnlyMode },
            videoLink: { value: this.point.videoLink, disabled: this.readOnlyMode },

            earZonesChinese: this.earZone_zh,
            earZonesEuropean: this.earZone_eu,
            //// disable x, y corrdination inputs, we get the values from ear.component
            xCoord: { value: this.point.location.x, disabled: true },
            yCoord: { value: this.point.location.y, disabled: true }
        });
        
        if (this.readOnlyMode) {
            this.earZone_zh.disable();
            this.earZone_eu.disable();
        }
    }

    submit() {
        if (this.pointForm.invalid) {
            console.log("Invalid submit");
            return;
        }
    
        //// enable x, y coordination input control before submit form. 
        //// disabled input controls are ingnored.
        this.pointForm.controls['xCoord'].enable();
        this.pointForm.controls['yCoord'].enable();
        this.earZone_zh.setValue(this.point.chineseEarZones);

        this.point.name = this.pointForm.controls['name'].value;
        this.point.function = this.pointForm.controls["function"].value;
        this.point.videoLink = this.pointForm.controls["videoLink"].value;
        this.point.location = { 
            "x": this.pointForm.controls['xCoord'].value, 
            "y": this.pointForm.controls['yCoord'].value, 
            "z": 0
        };
        this.point.chineseEarZones = this.earZone_zh.value;
  
        this.pointService.updatePoint(this.point)
        .subscribe(() => this.pointService.getPoint(this.point._id)
        .subscribe((point: Point) => {
            this.point = point;
            console.log(point);
        }));
    }

    goBack(): void {
        this.location.back();
    }    

    //// auto complete event
    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // if (value) {
        //    this.point.chineseEarZones.push(value);
        // }
    
        // Clear the input value
        event.chipInput!.clear();
        this.earZone_zh.setValue(null);
    }

    remove(earZone: EarZone): void {
        const index = this.point.chineseEarZones.indexOf(earZone);
        
        if (index >= 0) {
            this.point.chineseEarZones.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.point.chineseEarZones.push(event.option.value);
        this.earZonesChineseInput.nativeElement.value = '';
        this.earZone_zh.setValue(' ');
    }

    displayFn(earZone: EarZone): string {
        return earZone && earZone.name ? earZone.name : '';
    }

    private _filter(name: string): EarZone[] {
       const filterValue = name.toLowerCase();
    
        return this.earZones.filter(earZone => earZone.name.toLowerCase().includes(filterValue));
    }
}