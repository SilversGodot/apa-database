import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import EarRegion from '@app/models/earRegion';
import { EarRegionService } from '@app/services/earRegion.service';
import { DeleteDialog } from '@app/pages/components/delete-dialog';
import { AddEarRegionDialog } from '@app/pages/components/earRegion-dialog';

@Component({
  selector: 'app-earRegion-view',
  templateUrl: './earRegion-view.component.html',
  styleUrls: ['./earRegion-view.component.css']
})
export class EarRegionViewComponent implements OnInit {
  columnsToDisplay: string[] = ['name', 'description', 'edit'];
  dataSource: MatTableDataSource<EarRegion>;
  isLoading = true;

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
      });
  }

  update(element: EarRegion) {
    this.earRegionService.updateEarRegion(element)
    .subscribe();
  }

  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddEarRegionDialog, {
      width: '550px',
      disableClose: true,
      data: { 
        title: "Add Region of Ear", 
        earRegion: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Add Region of Ear result: ${result}`);

      if(!result) {
        return;
      }

      let earRegion: EarRegion = new EarRegion;
      earRegion.name = result.name;
      earRegion.description = result.description;

      this.earRegionService.createEarRegion(earRegion)
      .subscribe(() => this.earRegionService.getEarRegions()
      .subscribe((earRegions: EarRegion[]) => this.dataSource.data = earRegions));
    });
  }

  openDeleteDialog(earRegion: EarRegion){
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '400px',
      disableClose: true,
      data: {
        "type": "EarRegion",
        "object": ` ${earRegion.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Delete Point Dialog result: ${result}`);

      if(result) {
        this.earRegionService.deleteEarRegion(earRegion._id)
          .subscribe(() => this.dataSource.data = this.dataSource.data.filter(l => l._id != earRegion._id));
      }
    });
  }
}