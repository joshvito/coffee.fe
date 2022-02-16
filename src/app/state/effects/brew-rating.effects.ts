import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { BrewRatingActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';
import { RatingService } from 'src/app/services/rating.service';

@Injectable()
export class BrewRatingEffects {

  search$ = createEffect(() => this.actions$.pipe(
    ofType(BrewRatingActions.getMany.type),
    mergeMap(a => this.service.getMany(a.filters)
      .pipe(
        map(page => BrewRatingActions.getManySuccess({ page })),
        catchError((err: HttpErrorResponse) => of(BrewRatingActions.getManyFailure({errorMsg: err.message})))
      )),
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(BrewRatingActions.create.type),
    mergeMap(a => this.service.create(a.rating)
      .pipe(
        map(item => BrewRatingActions.createSuccess({item})),
        catchError((err: HttpErrorResponse) => of(BrewRatingActions.createFailure({errorMsg: err.message})))
      )),
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(BrewRatingActions.deleteRating.type),
    mergeMap(a => this.service.delete(a.id)
      .pipe(
        map(item => BrewRatingActions.deleteRatingSuccess({item})),
        catchError((err: HttpErrorResponse) => of(BrewRatingActions.deleteRatingFailure({errorMsg: err.message})))
      )),
  ));

  constructor(
    private actions$: Actions<BrewRatingActions.ActionsUnion>,
    private service: RatingService,
  ) {}
}
