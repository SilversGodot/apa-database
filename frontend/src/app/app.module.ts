import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtInterceptor } from './helpers/jwt.interceptor';

import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login-view/login.component';
import { PointListViewComponent } from './pages/point-view/point-list-view.component';
import { PointViewComponent } from './pages/point-view/point-view.component';
import { TreatmentListViewComponent } from './pages/treatment-view/treatment-list-view.component';
import { TreatmentViewComponent } from './pages/treatment-view/treatment-view.component';
import { SymptomViewComponent } from './pages/symptom-view/symptom-view.component';
import { EarZoneViewComponent } from './pages/earZone-view/earZone-view.component';
import { PointDialog } from './pages/components/point-dialog';
import { TreatmentDialog } from './pages/components/treatment-dialog';
import { SymptomDialog } from './pages/components/symptom-dialog';
import { AddEarZoneDialog } from './pages/components/earZone-dialog';
import { DeleteDialog } from './pages/components/delete-dialog';

import { SvgComponent } from './pages/components/ear.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PointListViewComponent,
    PointViewComponent,
    TreatmentListViewComponent,
    TreatmentViewComponent,
    SymptomViewComponent,
    EarZoneViewComponent,
    PointDialog,
    TreatmentDialog,
    SymptomDialog,
    AddEarZoneDialog,
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
