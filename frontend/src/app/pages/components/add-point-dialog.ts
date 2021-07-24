import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { COMMA, ENTER, F } from '@angular/cdk/keycodes'
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';

import BodyPart from '@app/models/bodyPart';

@Component({
    selector: 'add-point-dialog',
    templateUrl: 'add-edit-point-dialog.html',
  })
  export class AddPointDialog {
    pointForm: FormGroup;

    selectable = true;
    removable = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('bodyPartInput') bodyPartInput: ElementRef<HTMLInputElement>;

    constructor(
      private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<AddPointDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {

      }

      ngOnInit() {
        this.pointForm = this.formBuilder.group({
          code: ['', Validators.required],
          name: ['', Validators.required],
          partOfEar: '',
          bodyParts: new FormControl([], Validators.required),
          function: '',
          videoLink: ''
         });
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
    
      remove(fruit: BodyPart): void {
        const index = this.fruits.value.indexOf(fruit);
        console.log(index, "Remove BodyPart index: ");
    
        if (index >= 0) {
          this.fruits.value.splice(index, 1);
          this.fruits.updateValueAndValidity();
        }
      }
  }