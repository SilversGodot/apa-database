import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import EarZone from '@app/models/earZone';

@Component({
    selector: 'earZone-dialog',
    templateUrl: 'earZone-dialog.html'
})
export class AddEarZoneDialog {
  earZoneForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddEarZoneDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.data.earZone = new EarZone();
    this.earZoneForm = this.formBuilder.group({
      name: ['', Validators.required],
      alias: []  
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {        
    if (this.earZoneForm.invalid) {
      return;
    }
      this.dialogRef.close(this.earZoneForm.value);
  }
}