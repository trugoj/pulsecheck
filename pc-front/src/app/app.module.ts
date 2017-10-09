import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OnePulseComponent } from './one-pulse/one-pulse.component';

@NgModule({
  declarations: [
    AppComponent,
    OnePulseComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
