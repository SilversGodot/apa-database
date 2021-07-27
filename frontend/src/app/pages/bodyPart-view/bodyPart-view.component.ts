import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import BodyPart from '@app/models/bodyPart';
import { BodyPartService } from '@app/services/bodyPart.service';
import { DeleteDialog } from '@app/pages/components/delete-dialog';
import { AddBodyPartDialog } from '@app/pages/components/bodyPart-dialog';

@Component({
  selector: 'app-bodyPart-view',
  templateUrl: './bodyPart-view.component.html',
  styleUrls: ['./bodyPart-view.component.css']
})
export class BodyPartViewComponent implements OnInit {
  columnsToDisplay: string[] = ['name', 'description', 'edit'];
  dataSource: MatTableDataSource<BodyPart>;
  isLoading = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private bodyPartService: BodyPartService
  ) { 
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<BodyPart>([]);

    this.bodyPartService.getBodyParts()
      .subscribe((bodyParts: BodyPart[]) => {
        this.dataSource.data = bodyParts;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      });
  }

  update(element: BodyPart) {
    this.bodyPartService.updateBodyPart(element)
    .subscribe();
  }

  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddBodyPartDialog, {
      width: '550px',
      disableClose: true,
      data: { 
        title: "Add Body Part", 
        bodyPart: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Add Region of Ear result: ${result}`);

      if(!result) {
        return;
      }

      let bodyPart: BodyPart = new BodyPart;
      bodyPart.name = result.name;
      bodyPart.description = result.description;

      this.bodyPartService.createBodyPart(bodyPart)
      .subscribe(() => this.bodyPartService.getBodyParts()
      .subscribe((bodyParts: BodyPart[]) => this.dataSource.data = bodyParts));
    });
  }

  openDeleteDialog(bodyPart: BodyPart){
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '400px',
      disableClose: true,
      data: {
        "type": "EarRegion",
        "object": ` ${bodyPart.name}`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Delete Point Dialog result: ${result}`);

      if(result) {
        this.bodyPartService.deleteBodyPart(bodyPart._id)
          .subscribe(() => this.dataSource.data = this.dataSource.data.filter(l => l._id != bodyPart._id));
      }
    });
  }
}