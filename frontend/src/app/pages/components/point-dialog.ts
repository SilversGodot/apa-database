import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import BodyPart from '@app/models/bodyPart';

@Component({
  selector: 'point-dialog',
  templateUrl: 'point-dialog.html',
  styleUrls: ['point-dialog.css'],
})
export class PointDialog implements OnInit {
  pointForm: FormGroup;

  bodyPartsCtrl = new FormControl();
  selectable = true;
  readOnlyMode = this.data.action === 'View';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredBodyParts: Observable<BodyPart[]>;

  @ViewChild('bodyPartsInput') bodyPartsInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PointDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.filteredBodyParts = this.bodyPartsCtrl.valueChanges.pipe(
        startWith(null as string),
        map((bodypart: string | null) => bodypart? this._filter(bodypart) : this.data.bodyParts.slice()));
  }

  ngOnInit() {
    this.pointForm = this.formBuilder.group({
      code: [{ value: this.data.point.code, disabled: this.readOnlyMode }, Validators.required],
      name: [{ value: this.data.point.name, disabled: this.readOnlyMode }, Validators.required],
      partOfEar: { value: this.data.point.partOfEar._id, disabled: this.readOnlyMode },
      function: { value: this.data.point.function, disabled: this.readOnlyMode },
      videoLink: { value: this.data.point.videoLink, disabled: this.readOnlyMode },
      //// set bodyParts as FormControl to be accessed by MatChip event
      bodyParts: this.bodyPartsCtrl,       
      //// disable x, y corrdination inputs, we get the values from ear.component
      xCoord: { value: this.data.point.location.x, disabled: true },
      yCoord: { value: this.data.point.location.y, disabled: true }
    });

    if (this.readOnlyMode) {
      this.bodyPartsCtrl.disable();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.pointForm.invalid) {
      return;
    }

    //// enable x, y coordination input control before submit form. 
    //// disabled input controls are ingnored.
    this.pointForm.controls['xCoord'].enable();
    this.pointForm.controls['yCoord'].enable();
    this.bodyPartsCtrl.setValue(this.data.point.bodyParts);
    this.dialogRef.close(this.pointForm.value);
  }

  //// subscribe event from child component - EarSvg
  coordChangedHandler(event: any)
  {
    this.pointForm.controls['xCoord'].setValue(event.x);
    this.pointForm.controls['yCoord'].setValue(event.y);
  }

  //// BodyPart auto complete
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.data.point.bodyParts.push(value);
    }
    
    // Clear the input value
    event.chipInput!.clear();
    this.bodyPartsCtrl.setValue(null);
  }
          
  remove(bodyPart: string): void {
    const index = this.data.point.bodyParts.indexOf(bodyPart);
    
    if (index >= 0) {
      this.data.point.bodyParts.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.data.point.bodyParts.push(event.option.viewValue);
    this.bodyPartsInput.nativeElement.value = '';
    this.bodyPartsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.data.bodyParts.filter(bodyPart => bodyPart.name.toLowerCase().includes(filterValue));
  }
}