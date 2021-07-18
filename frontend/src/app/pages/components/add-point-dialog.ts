import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'add-point-dialog',
    templateUrl: 'add-edit-point-dialog.html',
  })
  export class AddPointDialog {
    pointForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<AddPointDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}

      ngOnInit() {
        this.pointForm = this.formBuilder.group({
          code: ['', Validators.required],
          name: ['', Validators.required],
          partOfEar: '',
          bodyPart: '',
          function: ''
         });
      }

      closeDialog() {
        this.dialogRef.close();
      }

      submit() {        
        if (this.pointForm.invalid) {
          return;
        }

        console.log(this.pointForm.value);
        this.dialogRef.close(this.pointForm.value);
      }
  }