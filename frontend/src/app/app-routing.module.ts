import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EarZoneViewComponent } from './pages/earZone-view/earZone-view.component';
import { LoginComponent } from './pages/login-view/login.component';
import { PointListViewComponent } from './pages/point-view/point-list-view.component';
import { PointViewComponent } from './pages/point-view/point-view.component';
import { TreatmentListViewComponent } from './pages/treatment-view/treatment-list-view.component';
import { TreatmentViewComponent } from './pages/treatment-view/treatment-view.component';
import { SymptomViewComponent } from './pages/symptom-view/symptom-view.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'points', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'points', component: PointListViewComponent },
  { path: 'points/:pointId', component: PointViewComponent },
  { path: 'treatments', component: TreatmentListViewComponent,  canActivate : [AuthGuardService] },
  { path: 'treatments/:treatmentId', component: TreatmentViewComponent,  canActivate : [AuthGuardService] },
  { path: 'symptoms', component: SymptomViewComponent, canActivate : [AuthGuardService] },
  { path: 'earZones', component: EarZoneViewComponent, canActivate : [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
