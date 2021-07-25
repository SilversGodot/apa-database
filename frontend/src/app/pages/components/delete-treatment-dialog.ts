import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'delete-treatment-dialog',
    templateUrl: 'delete-treatment-dialog.html',
  })
  export class DeleteTreatmentDialog implements OnInit {
    constructor (
      public dialogRef: MatDialogRef<DeleteTreatmentDialog>, 
      @Inject(MAT_DIALOG_DATA) public data: any
      ) { }
  
    ngOnInit() {

    }
  
    closeDialog() {
      this.dialogRef.close();
    }
  }