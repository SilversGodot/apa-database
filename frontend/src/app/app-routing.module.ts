import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EarZoneViewComponent } from './pages/earZone-view/earZone-view.component';
import { LoginComponent } from './pages/login-view/login.component';
import { PointListViewComponent } from './pages/point-view/point-list-view.component';
import { PointViewComponent } from './pages/point-view/point-view.component';
import { TreatmentListViewComponent } from './pages/treatment-view/treatment-list-view.component';
import { TreatmentViewComponent } from './pages/treatment-view/treatment-view.component';
import { SymptomViewComponent } from './pages/symptom-view/symptom-view.component';

import { AuthGuard } from './helpers/auth.guard';

// const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./models/user').then(x => x.default);

const routes: Routes = [
  { path: '', redirectTo: 'points', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'points', component: PointListViewComponent },
  { path: 'points/:pointId', component: PointViewComponent },
  { path: 'treatments', component: TreatmentListViewComponent },
  { path: 'treatments/:treatmentId', component: TreatmentViewComponent },
  { path: 'symptoms', component: SymptomViewComponent },
  { path: 'earZones', component: EarZoneViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
