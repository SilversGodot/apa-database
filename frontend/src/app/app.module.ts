import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PointViewComponent } from './pages/point-view/point-view.component';

import { DialogContentExample, DialogContentExampleDialog } from './pages/modal-view/dialog-content-example';

@NgModule({
  declarations: [
    AppComponent,
    PointViewComponent,
    DialogContentExample, 
    DialogContentExampleDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [
  ],
  entryComponents: [DialogContentExample, DialogContentExampleDialog],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
