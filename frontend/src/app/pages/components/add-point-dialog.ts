import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'add-point-dialog',
    templateUrl: 'add-edit-point-dialog.html',
  })
  export class AddPointDialog {
    constructor(
      private dialogRef: MatDialogRef<AddPointDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any){}

      closeDialog() {
        this.dialogRef.close();
      }
  }