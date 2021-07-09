import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'delete-point-dialog',
    templateUrl: 'delete-point-dialog.html',
  })
  export class DeletePointDialog implements OnInit {
    constructor (
      public dialogRef: MatDialogRef<DeletePointDialog>, 
      @Inject(MAT_DIALOG_DATA) public data: any
      ) { }
  
    ngOnInit() {
  
    }
  
    closeDialog() {
      this.dialogRef.close();
    }
  }