import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { RatingActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';
import { RatingService } from 'src/app/services/rating.service';

@Injectable()
export class RatingEffects {

  create$ = createEffect(() => this.actions$.pipe(
    ofType(RatingActions.create.type),
    mergeMap(a => this.service.create(a.item)
      .pipe(
        map(item => RatingActions.createSuccess({item})),
        catchError((err: HttpErrorResponse) => of(RatingActions.createFailure({errorMsg: err.message})))
      )),
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(RatingActions.deleteRating.type),
    mergeMap(a => this.service.delete(a.id)
      .pipe(
        map(item => RatingActions.deleteRatingSuccess({item})),
        catchError((err: HttpErrorResponse) => of(RatingActions.deleteRatingFailure({errorMsg: err.message})))
      )),
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(RatingActions.update.type),
    mergeMap(a => this.service.update(a.item)
      .pipe(
        map(item => RatingActions.updateSuccess({item})),
        catchError((err: HttpErrorResponse) => of(RatingActions.updateFailure({errorMsg: err.message})))
      )),
  ));

  constructor(
    private actions$: Actions<RatingActions.ActionsUnion>,
    private service: RatingService,
  ) {}
}
