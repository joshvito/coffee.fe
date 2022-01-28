import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrewMethodsComponent } from './components/brew-methods/brew-methods.component';
import { BeansComponent } from './components/beans/beans.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BrewMethodsComponent,
    BeansComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
