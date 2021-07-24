import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import BodyPart from '@app/models/bodyPart';

@Component({
  selector: 'edit-point-dialog',
  templateUrl: 'add-edit-point-dialog.html',
})
export class EditPointDialog implements OnInit {
  pointForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('bodyPartInput') bodyPartInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditPointDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

    ngOnInit() {
      this.pointForm = this.formBuilder.group({
        code: [this.data.point.code, Validators.required],
        name: [this.data.point.name, Validators.required],
        partOfEar: this.data.point.partOfEar,
        bodyParts: new FormControl(this.data.point.bodyParts, Validators.required),        
        function: this.data.point.function,
        videoLink: this.data.point.videoLink
      });

      console.log(this.data.point.bodyParts, "Point-bodyParts: ");
    }

    closeDialog() {
      this.dialogRef.close();
    }

    submit() {
      if (this.pointForm.invalid) {
        return;
      }

      console.log(this.pointForm.value);
      this.dialogRef.close(this.pointForm.value);
    }

      ////
      get fruits() {
        return this.pointForm.get('bodyParts');
      }
      
      add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
          
        // Add our fruit
        if ((value || '').trim()) {
          this.fruits.setValue([...this.fruits.value, value.trim()]);
          this.fruits.updateValueAndValidity();
        }
          
        // Reset the input value
        if (input) {
          input.value = '';
        }
      }
          
    remove(fruit: string): void {
      const index = this.fruits.value.indexOf(fruit);
          
      if (index >= 0) {
        this.fruits.value.splice(index, 1);
        this.fruits.updateValueAndValidity();
      }
    }
}