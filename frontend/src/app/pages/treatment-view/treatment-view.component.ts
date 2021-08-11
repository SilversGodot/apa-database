import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Component } from '@angular/core';

export interface Point {
  name: string;
}

@Component({
  selector: 'treatment-view',
  templateUrl: 'treatment-view.component.html',
  styleUrls: ['treatment-view.component.css'],
})
export class TreatmentViewComponent {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  points: Point[] = [
    {name: 'Shen Men'},
    {name: 'Ear Apex'},
    {name: 'Tranquilizer'},
  ];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.points.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(point: Point): void {
    const index = this.points.indexOf(point);

    if (index >= 0) {
      this.points.splice(index, 1);
    }
  }
}