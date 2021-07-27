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
import { SymptomViewComponent } from './pages/symptom-view/symptom-view.component';
import { EarRegionViewComponent } from './pages/earRegion-view/earRegion-view.component';
import { BodyPartViewComponent } from './pages/bodyPart-view/bodyPart-view.component';
import { PointDialog } from './pages/components/point-dialog';
import { AddTreatmentDialog } from './pages/components/add-treatment-dialog';
import { EditTreatmentDialog } from './pages/components/edit-treatment-dialog';
import { AddEarRegionDialog } from './pages/components/earRegion-dialog';
import { AddBodyPartDialog } from './pages/components/bodyPart-dialog';
import { DeleteDialog } from './pages/components/delete-dialog';

import { SvgComponent } from './pages/components/ear.component';



@NgModule({
  declarations: [
    AppComponent,
    PointViewComponent,
    TreatmentViewComponent,
    SymptomViewComponent,
    EarRegionViewComponent,
    BodyPartViewComponent,
    PointDialog,
    AddTreatmentDialog,
    EditTreatmentDialog,
    AddEarRegionDialog,
    AddBodyPartDialog,
    DeleteDialog,
    SvgComponent
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
