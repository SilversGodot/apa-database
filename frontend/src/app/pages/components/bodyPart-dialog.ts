import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import BodyPart from '@app/models/bodyPart';

@Component({
    selector: 'bodyPart-dialog',
    templateUrl: 'bodyPart-dialog.html',
  })
export class AddBodyPartDialog {
    bodyPartForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<AddBodyPartDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.data.bodyPart = new BodyPart();
        this.bodyPartForm = this.formBuilder.group({
            description: [''],
            name: ['', Validators.required]
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }

    submit() {        
        if (this.bodyPartForm.invalid) {
          return;
        }
        this.dialogRef.close(this.bodyPartForm.value);
    }
}