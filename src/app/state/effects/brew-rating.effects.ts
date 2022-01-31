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
    mergeMap(a => this.service.getMany()
      .pipe(
        map(page => BrewRatingActions.getManySuccess({ page })),
        catchError((err: HttpErrorResponse) => of(BrewRatingActions.getManyFailure({errorMsg: err.message})))
      )),
  ));

  constructor(
    private actions$: Actions<BrewRatingActions.ActionsUnion>,
    private service: RatingService,
  ) {}
}