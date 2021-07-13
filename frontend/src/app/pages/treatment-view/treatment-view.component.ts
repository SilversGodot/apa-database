import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTable } from '@angular/material/table';

import Treatment from 'src/app/models/treatment';
import { TreatmentService } from '@app/services/treatment.service';

@Component({
  selector: 'app-treatment-view',
  templateUrl: './treatment-view.component.html',
  styleUrls: ['./treatment-view.component.css']
})
export class TreatmentViewComponent implements OnInit {
  treatments: Treatment[] = [];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private treatmentService: TreatmentService
  ) { 
  }

  ngOnInit(): void {
    this.treatmentService.getTreatments()
      .subscribe((treatments: Treatment[]) => this.treatments = treatments);
  }
}