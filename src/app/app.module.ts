import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrewMethodsComponent } from './components/brew-methods/brew-methods.component';
import { BeansComponent } from './components/beans/beans.component';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from './state/reducers';
import {effects} from './state/effects';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { RatingsComponent } from './components/ratings/ratings.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BrewMethodsComponent,
    BeansComponent,
    RatingsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot(fromRoot.reducers, {metaReducers: fromRoot.metaReducers}),
    EffectsModule.forRoot([...effects])
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
