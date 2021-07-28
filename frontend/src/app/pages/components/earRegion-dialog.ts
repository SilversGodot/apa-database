import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import EarRegion from '@app/models/earRegion';

@Component({
    selector: 'point-dialog',
    templateUrl: 'earRegion-dialog.html'
})
export class AddEarRegionDialog {
  earRegionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEarRegionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.data.earRegion = new EarRegion();
    this.earRegionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']  
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {        
    if (this.earRegionForm.invalid) {
      return;
    }
      this.dialogRef.close(this.earRegionForm.value);
  }
}