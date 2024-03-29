// particular imports for hammer
import * as Hammer from 'hammerjs';
import { HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrewMethodsComponent } from './components/brew-methods/brew-methods.component';
import { BeansComponent } from './components/beans/beans.component';
import { StoreModule } from '@ngrx/store';
import * as fromRoot from './state/reducers';
import { effects } from './state/effects';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { RatingsComponent } from './components/ratings/ratings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewBrewComponent } from './components/ratings/new-brew.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';
import { RatingFilterComponent } from './components/rating-filter/rating-filter.component';
import { NewMethodComponent } from './components/brew-methods/new-method.component';
import { NewBeanComponent } from './components/beans/new-bean.component';
import { httpInterceptorProviders } from './interceptors';
import { SigninerizerComponent } from './components/signinerizer/signinerizer.component';
import { EditBrewComponent } from './components/ratings/edit-brew.component';
import { UserInitialsPipe } from './pipes/user-initials.pipe';
import { NewRatingComponent } from './components/ratings/new-rating.component';
import { EditRatingComponent } from './components/ratings/edit-rating.component';
import { StarsComponent } from './components/stars/stars.component';
import { StarsInputComponent } from './components/stars-input/stars-input.component';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL },
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BrewMethodsComponent,
    BeansComponent,
    RatingsComponent,
    NewBrewComponent,
    EnumToArrayPipe,
    SentenceCasePipe,
    RatingFilterComponent,
    NewMethodComponent,
    NewBeanComponent,
    SigninerizerComponent,
    EditBrewComponent,
    UserInitialsPipe,
    NewRatingComponent,
    EditRatingComponent,
    StarsComponent,
    StarsInputComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    StoreModule.forRoot(fromRoot.reducers, {metaReducers: fromRoot.metaReducers}),
    EffectsModule.forRoot([...effects]),
    NgbModule,
    HammerModule
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
