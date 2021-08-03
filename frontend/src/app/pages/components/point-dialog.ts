import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import EarZone from '@app/models/earZone';

@Component({
  selector: 'point-dialog',
  templateUrl: 'point-dialog.html',
  styleUrls: ['dialog.css']
})
export class PointDialog implements OnInit {
  pointForm: FormGroup;
  earZone_zh: FormControl = new FormControl;

  selectable = true;
  readOnlyMode = this.data.action === 'ViewPoint';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  earZones: EarZone[] = [];
  filteredEarZones: Observable<EarZone[]>;

  @ViewChild('earZonesChineseInput') earZonesChineseInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PointDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.filteredEarZones = this.earZone_zh.valueChanges
      .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.earZones.slice())
      );
  }

  ngOnInit() {
    this.pointForm = this.formBuilder.group({
      code: [{ value: this.data.point.code, disabled: this.readOnlyMode }, Validators.required],
      name: [{ value: this.data.point.name, disabled: this.readOnlyMode }, Validators.required],
      earZonesChinese: this.earZone_zh,
      function: { value: this.data.point.function, disabled: this.readOnlyMode },
      earAnatomy: { value: this.data.point.earAnatomy, disabled: this.readOnlyMode },
      videoLink: { value: this.data.point.videoLink, disabled: this.readOnlyMode },

      //// disable x, y corrdination inputs, we get the values from ear.component
      xCoord: { value: this.data.point.location.x, disabled: true },
      yCoord: { value: this.data.point.location.y, disabled: true }
    });

    if (this.readOnlyMode) {
      this.earZone_zh.disable();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  chineseEarZoneSelected(event: MatAutocompleteSelectedEvent): void {
    // this.point.chineseEarZones.push(event.option.value);
    this.earZonesChineseInput.nativeElement.value = '';
    this.earZone_zh.setValue(' ');
  }

  chineseEarZoneRemove(earZone: EarZone): void {
    const index = this.data.point.chineseEarZones.indexOf(earZone);
    if (index >= 0) {
        this.data.point.chineseEarZones.splice(index, 1);
    }
}

  displayEarZoneName(earZone: EarZone): string {
    return earZone && earZone.name ? earZone.name : '';
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

  submit() {
    if (this.pointForm.invalid) {
      return;
    }

    //// enable x, y coordination input control before submit form. 
    //// disabled input controls are ingnored.
    this.pointForm.controls['xCoord'].enable();
    this.pointForm.controls['yCoord'].enable();
    this.dialogRef.close(this.pointForm.value);
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