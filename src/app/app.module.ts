import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrewMethodsComponent } from './components/brew-methods/brew-methods.component';
import { BeansComponent } from './components/beans/beans.component';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from './state/reducers';
import { effects } from './state/effects';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { RatingsComponent } from './components/ratings/ratings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewRatingComponent } from './components/ratings/new-rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
import { RatingFilterComponent } from './components/rating-filter/rating-filter.component';
import { NewMethodComponent } from './components/brew-methods/new-method.component';
import { NewBeanComponent } from './components/beans/new-bean.component';
import { ErrorInterceptor } from './interceptors/error.interceptors';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BrewMethodsComponent,
    BeansComponent,
    RatingsComponent,
    NewRatingComponent,
    EnumToArrayPipe,
    SentenceCasePipe,
    RatingFilterComponent,
    NewMethodComponent,
    NewBeanComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot(fromRoot.reducers, {metaReducers: fromRoot.metaReducers}),
    EffectsModule.forRoot([...effects]),
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
