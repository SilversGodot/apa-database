import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'edit-point-dialog',
    templateUrl: 'add-edit-point-dialog.html',
  })
  export class EditPointDialog {
    constructor(
      private dialogRef: MatDialogRef<EditPointDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any){}

      closeDialog() {
        this.dialogRef.close();
      }
  }