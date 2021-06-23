import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPointComponent } from './pages/new-point/new-point.component';
import { PointViewComponent } from './pages/point-view/point-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'points', pathMatch: 'full' },
  {path: 'points', component: PointViewComponent},
  {path: 'points/:pointId', component: PointViewComponent},
  {path: 'new-point', component: NewPointComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
