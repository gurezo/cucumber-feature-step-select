import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DispFrameComponentComponent } from './disp-frame-component/disp-frame-component.component';
import { DispItemComponentComponent } from './disp-item-component/disp-item-component.component';


@NgModule({
  declarations: [
    AppComponent,
    DispFrameComponentComponent,
    DispItemComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
