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
  selector: 'add-edit-point-dialog',
  templateUrl: 'add-edit-point-dialog.html',
})
export class AddEditPointDialog implements OnInit {
  pointForm: FormGroup;

  bodyPartsCtrl = new FormControl();
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredBodyParts: Observable<BodyPart[]>;

  @ViewChild('bodyPartsInput') bodyPartsInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEditPointDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.filteredBodyParts = this.bodyPartsCtrl.valueChanges.pipe(
        startWith(null as string),
        map((bodypart: string | null) => bodypart? this._filter(bodypart) : this.data.bodyParts.slice()));
  }

  ngOnInit() {
    this.pointForm = this.formBuilder.group({
      code: [this.data.point.code, Validators.required],
      name: [this.data.point.name, Validators.required],
      partOfEar: this.data.point.partOfEar._id, 
      bodyParts: this.bodyPartsCtrl,       
      function: this.data.point.function,
      videoLink: this.data.point.videoLink,
      xCoord: this.data.point.location.x,
      yCoord: this.data.point.location.y
    });

    this.pointForm.controls['xCoord'].disable();
    this.pointForm.controls['yCoord'].disable();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {
    if (this.pointForm.invalid) {
      return;
    }

    this.pointForm.controls['xCoord'].enable();
    this.pointForm.controls['yCoord'].enable();
    this.bodyPartsCtrl.setValue(this.data.point.bodyParts);
    this.dialogRef.close(this.pointForm.value);
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

  //// subscribe event from child component - EarSvg
  coordChangedHandler(event: any)
  {
    this.pointForm.controls['xCoord'].setValue(event.x);
    this.pointForm.controls['yCoord'].setValue(event.y);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();

    return this.data.bodyParts.filter(bodyPart => bodyPart.name.toLowerCase().includes(filterValue));
  }
}