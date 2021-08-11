import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import Point from 'src/app/models/point';
import EarZone from '@app/models/earZone';

import { PointService } from '@app/services/point.service';
import { EarZoneService } from '@app/services/earZone.service';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'point-view',
  templateUrl: './point-view.component.html',
  styleUrls: ['./point-view.component.css']
})
export class PointViewComponent implements OnInit {
    pointForm: FormGroup;
    earZone_zh = new FormControl();
    earZone_eu = new FormControl();

    isAuthenticated = false;

    point: Point;  
    selectable = true;
    isLoading = true;
    earZones: EarZone[] = [];
    separatorKeysCodes: number[] = [ENTER, COMMA];
    filteredEarZones: Observable<EarZone[]>;

    @ViewChild('earZonesChineseInput') earZonesChineseInput: ElementRef<HTMLInputElement>;
    @ViewChild('earZonesEuropeanInput') earZonesEuropeanInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private accountService: AccountService,
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
        this.isAuthenticated = this.accountService.isAuthenticated().valueOf();
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
            code: [{ value: this.point.code, disabled: !this.isAuthenticated }, Validators.required],
            name: [{ value: this.point.name, disabled: !this.isAuthenticated }, Validators.required],
            //// alias: { value: this.point.alias, disabled: !this.isAuthenticated },
            earAnatomy: { value: this.point.earAnatomy, disabled: !this.isAuthenticated },
            function: { value: this.point.function, disabled: !this.isAuthenticated },
            videoLink: { value: this.point.videoLink, disabled: !this.isAuthenticated },

            earZonesChinese: this.earZone_zh,
            earZonesEuropean: this.earZone_eu,
            //// disable x, y corrdination inputs, we get the values from ear.component
            xCoord: { value: this.point.location.x, disabled: true },
            yCoord: { value: this.point.location.y, disabled: true }
        });
        
        if (!this.isAuthenticated) {
            this.earZone_zh.disable();
            this.earZone_eu.disable();
        }
    }

    submit() {
        if (this.pointForm.invalid) {
            return;
        }
    
        //// enable x, y coordination input control before submit form. 
        //// disabled input controls are ingnored.
        this.pointForm.controls['xCoord'].enable();
        this.pointForm.controls['yCoord'].enable();
        this.earZone_zh.setValue(this.point.chineseEarZones);
        this.earZone_eu.setValue(this.point.europeanEarZones);

        this.point.code = this.pointForm.controls['code'].value;
        this.point.name = this.pointForm.controls['name'].value;
        this.point.alias = this.pointForm.controls['alias'].value;
        this.point.earAnatomy = this.pointForm.controls['earAnatomy'].value;
        this.point.function = this.pointForm.controls["function"].value;
        this.point.videoLink = this.pointForm.controls["videoLink"].value;
        this.point.location = { 
            "x": this.pointForm.controls['xCoord'].value, 
            "y": this.pointForm.controls['yCoord'].value, 
            "z": 0
        };
        this.point.chineseEarZones = this.earZone_zh.value;
        this.point.europeanEarZones = this.earZone_eu.value;
  
        this.pointService.updatePoint(this.point)
        .subscribe(() => this.pointService.getPoint(this.point._id)
        .subscribe((point: Point) => {
            this.point = point;
            this.openSnackBar(point.name + " updated.", "Dismiss");
        }));
    }

    goBack(): void {
        this.location.back();
    }    

    //// auto complete event
    add(event: MatChipInputEvent, target: string): void {
        const value = (event.value || '').trim();

        console.log(event);

        if (value) {
            switch(target) {
                case 'alias':
                    if(!this.point.alias) {
                        this.point.alias = [];
                    }
                    this.point.alias.push(value);
                    break;
                
                case 'earZone_zh':
                    // this.point.chineseEarZones.push(value);
                    break;

                case 'earZone_eu':
                    // this.point.europeanEarZones.push(value);
                    break;
            }
        }
    
        // Clear the input value
        event.chipInput!.clear();
    }

    remove(alias: string): void {
        const index = this.point.alias.indexOf(alias);

        if (index >= 0) {
            this.point.alias.splice(index, 1);
        }
    }

    chineseEarZoneRemove(earZone: EarZone): void {
        const index = this.point.chineseEarZones.indexOf(earZone);
        
        if (index >= 0) {
            this.point.chineseEarZones.splice(index, 1);
        }
    }

    europeanEarZoneRemove(earZone: EarZone): void {
        const index = this.point.europeanEarZones.indexOf(earZone);
        
        if (index >= 0) {
            this.point.europeanEarZones.splice(index, 1);
        }
    }

    chineseEarZoneSelected(event: MatAutocompleteSelectedEvent): void {
        this.point.chineseEarZones.push(event.option.value);
        this.earZonesChineseInput.nativeElement.value = '';
        this.earZone_zh.setValue(' ');
    }

    europeanEarZoneSelected(event: MatAutocompleteSelectedEvent): void {
        this.point.europeanEarZones.push(event.option.value);
        this.earZonesEuropeanInput.nativeElement.value = '';
        this.earZone_eu.setValue(' ');
    }

    displayEarZoneName(earZone: EarZone): string {
        return earZone && earZone.name ? earZone.name : '';
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, { duration: 3000 });
    }

    //// subscribe event from child component - EarSvg
    coordChangedHandler(event: any)
    {
        this.pointForm.controls['xCoord'].setValue(event.x);
        this.pointForm.controls['yCoord'].setValue(event.y);
    }

    private _filter(name: string): EarZone[] {
       const filterValue = name.toLowerCase();
    
        return this.earZones.filter(earZone => earZone.name.toLowerCase().includes(filterValue));
    }
}