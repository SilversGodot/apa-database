import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import Point from 'src/app/models/point';

@Component({
    selector: 'add-point-dialog',
    templateUrl: 'add-point-dialog.html',
  })
  export class AddPointDialog {
    constructor(
      private dialogRef: MatDialogRef<AddPointDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Point){}

    onNoClick(): void {
      this.dialogRef.close();
    }
  }