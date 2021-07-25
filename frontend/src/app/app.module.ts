import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PointViewComponent } from './pages/point-view/point-view.component';
import { TreatmentViewComponent } from './pages/treatment-view/treatment-view.component';
import { EarRegionViewComponent } from './pages/earRegion-view/earRegion-view.component';
import { AddPointDialog } from './pages/components/add-point-dialog';
import { EditPointDialog } from './pages/components/edit-point-dialog';
import { DeleteDialog } from './pages/components/delete-dialog';
import { AddTreatmentDialog } from './pages/components/add-treatment-dialog';
import { EditTreatmentDialog } from './pages/components/edit-treatment-dialog';



@NgModule({
  declarations: [
    AppComponent,
    PointViewComponent,
    TreatmentViewComponent,
    EarRegionViewComponent,
    AddPointDialog,
    EditPointDialog,
    DeleteDialog,
    AddTreatmentDialog,
    EditTreatmentDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
