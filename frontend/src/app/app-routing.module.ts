import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointViewComponent } from './pages/point-view/point-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'points', pathMatch: 'full' },
  { path: 'points', component: PointViewComponent },
  { path: 'points/:pointId', component: PointViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
