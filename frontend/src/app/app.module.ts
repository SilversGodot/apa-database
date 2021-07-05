import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PointViewComponent } from './pages/point-view/point-view.component';
import { NewPointComponent } from './pages/new-point/new-point.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WidgetPaginationComponent } from './pages/components/widget-pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    PointViewComponent,
    NewPointComponent,
    WidgetPaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [WidgetPaginationComponent],
  providers: [],
  bootstrap: [AppComponent, WidgetPaginationComponent]
})
export class AppModule { }
