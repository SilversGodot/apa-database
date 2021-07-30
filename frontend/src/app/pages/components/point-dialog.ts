import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'point-dialog',
  templateUrl: 'point-dialog.html',
  styleUrls: ['point-dialog.css'],
})
export class PointDialog implements OnInit {
  pointForm: FormGroup;

  selectable = true;
  readOnlyMode = this.data.action === 'View';
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('bodyPartsInput') bodyPartsInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PointDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.pointForm = this.formBuilder.group({
      code: [{ value: this.data.point.code, disabled: this.readOnlyMode }, Validators.required],
      name: [{ value: this.data.point.name, disabled: this.readOnlyMode }, Validators.required],
      function: { value: this.data.point.function, disabled: this.readOnlyMode },
      earAnatomy: { value: this.data.point.earAnatomy, disabled: this.readOnlyMode },
      videoLink: { value: this.data.point.videoLink, disabled: this.readOnlyMode },

      //// disable x, y corrdination inputs, we get the values from ear.component
      xCoord: { value: this.data.point.location.x, disabled: true },
      yCoord: { value: this.data.point.location.y, disabled: true }
    });
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
    this.dialogRef.close(this.pointForm.value);
  }

  //// subscribe event from child component - EarSvg
  coordChangedHandler(event: any)
  {
    this.pointForm.controls['xCoord'].setValue(event.x);
    this.pointForm.controls['yCoord'].setValue(event.y);
  }
}