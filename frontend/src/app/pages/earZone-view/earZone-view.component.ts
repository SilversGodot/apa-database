import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import EarZone from '@app/models/earZone';
import { EarZoneService } from '@app/services/earZone.service';
import { DeleteDialog } from '@app/pages/components/delete-dialog';
import { AddEarZoneDialog } from '@app/pages/components/earZone-dialog';

@Component({
  selector: 'app-earZone-view',
  templateUrl: './earZone-view.component.html',
  styleUrls: ['./earZone-view.component.css']
})
export class EarZoneViewComponent implements OnInit {
  columnsToDisplay: string[] = ['name', 'alias', 'edit'];
  dataSource: MatTableDataSource<EarZone>;
  isLoading = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private earZoneService: EarZoneService
  ) { 
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<EarZone>([]);

    this.earZoneService.getEarZones()
      .subscribe((earZones: EarZone[]) => {
        this.dataSource.data = earZones;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;

        console.log(earZones);
      });
  }

  update(element: EarZone) {
    this.earZoneService.updateEarZone(element)
    .subscribe();
  }

  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddEarZoneDialog, {
      width: '550px',
      disableClose: true,
      data: { 
        title: "Add new Ear Zone", 
        earRegion: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Add Ear Zone result: ${result}`);

      if(!result) {
        return;
      }

      let earZone: EarZone = new EarZone;
      earZone.name = result.name;
      earZone.alias = result.alias;

      this.earZoneService.createEarZone(earZone)
      .subscribe(() => this.earZoneService.getEarZones()
      .subscribe((earZones: EarZone[]) => this.dataSource.data = earZones));
    });
  }

  openDeleteDialog(earZone: EarZone){
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '400px',
      disableClose: true,
      data: {
        "type": "EarRegion",
        "object": ` ${earZone.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Delete Point Dialog result: ${result}`);

      if(result) {
        this.earZoneService.deleteEarZone(earZone._id)
          .subscribe(() => this.dataSource.data = this.dataSource.data.filter(l => l._id != earZone._id));
      }
    });
  }
}