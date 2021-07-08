import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointViewComponent } from './pages/point-view/point-view.component';
import { DialogContentExample } from './pages/modal-view/dialog-content-example';

const routes: Routes = [
  { path: '', redirectTo: 'points', pathMatch: 'full' },
  { path: 'points', component: PointViewComponent },
  { path: 'points/:pointId', component: PointViewComponent },
  { path: 'modal', component: DialogContentExample }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
