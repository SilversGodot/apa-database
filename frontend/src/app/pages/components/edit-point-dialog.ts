import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import Point from 'src/app/models/point';

@Component({
    selector: 'edit-point-dialog',
    templateUrl: 'add-point-dialog.html',
  })
  export class EditPointDialog {
    constructor(
      private dialogRef: MatDialogRef<EditPointDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Point){}

      closeDialog() {
        this.dialogRef.close();
      }
  }