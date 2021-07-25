import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import EarRegion from '@app/models/earRegion';
import { EarRegionService } from '@app/services/earRegion.service';

@Component({
  selector: 'app-earRegion-view',
  templateUrl: './earRegion-view.component.html',
  styleUrls: ['./earRegion-view.component.css']
})
export class EarRegionViewComponent implements OnInit {
  columnsToDisplay: string[] = ['name', 'description', 'edit'];
  dataSource: MatTableDataSource<EarRegion>;
  isLoading = true;

  editEarRegion: any;
  oldEarRegion: any;
  editdisabled: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private earRegionService: EarRegionService
  ) { 

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<EarRegion>([]);

    this.earRegionService.getEarRegions()
      .subscribe((earRegions: EarRegion[]) => {
        this.dataSource.data = earRegions;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;

        console.log(earRegions);
      });
  }
}