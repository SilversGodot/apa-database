import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'edit-point-dialog',
    templateUrl: 'add-edit-point-dialog.html',
  })
  export class EditPointDialog implements OnInit{
    pointForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<EditPointDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any){}

      ngOnInit() {
        this.pointForm = this.formBuilder.group({
          code: [this.data.point.code, Validators.required],
          name: [this.data.point.name, Validators.required],
          partOfEar: this.data.point.partOfEar,
          bodyPart: this.data.point.bodyPart,
          function: this.data.point.function
         });
      }

      closeDialog() {
        this.dialogRef.close();
      }

      submit(){
        if (this.pointForm.invalid) {
          return;
        }

        console.log(this.pointForm.value);
        this.dialogRef.close(this.pointForm.value);
      }
  }