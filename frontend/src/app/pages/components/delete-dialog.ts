import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'delete-dialog',
    templateUrl: 'delete-dialog.html',
  })
export class DeleteDialog {
  constructor (
    public dialogRef: MatDialogRef<DeleteDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  
  closeDialog() {
    this.dialogRef.close();
  }
}