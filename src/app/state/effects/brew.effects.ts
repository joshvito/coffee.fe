import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { BrewActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';
import { BrewService } from 'src/app/services/brew.service';

@Injectable()
export class BrewEffects {

  search$ = createEffect(() => this.actions$.pipe(
    ofType(BrewActions.getMany.type),
    mergeMap(a => this.service.getMany(a.filters)
      .pipe(
        map(page => BrewActions.getManySuccess({ page })),
        catchError((err: HttpErrorResponse) => of(BrewActions.getManyFailure({errorMsg: err.message})))
      )),
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(BrewActions.create.type),
    mergeMap(a => this.service.create(a.brew)
      .pipe(
        map(item => BrewActions.createSuccess({item})),
        catchError((err: HttpErrorResponse) => of(BrewActions.createFailure({errorMsg: err.message})))
      )),
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(BrewActions.deleteRating.type),
    mergeMap(a => this.service.delete(a.id)
      .pipe(
        map(item => BrewActions.deleteRatingSuccess({item})),
        catchError((err: HttpErrorResponse) => of(BrewActions.deleteRatingFailure({errorMsg: err.message})))
      )),
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(BrewActions.update.type),
    mergeMap(a => this.service.update(a.item)
      .pipe(
        map(item => BrewActions.updateSuccess({item})),
        catchError((err: HttpErrorResponse) => of(BrewActions.updateFailure({errorMsg: err.message})))
      )),
  ));

  constructor(
    private actions$: Actions<BrewActions.ActionsUnion>,
    private service: BrewService,
  ) {}
}
