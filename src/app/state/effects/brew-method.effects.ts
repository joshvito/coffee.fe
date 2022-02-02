import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { BrewMethodActions } from '../actions';
import { HttpErrorResponse } from '@angular/common/http';
import { BrewMethodService } from 'src/app/services/brew-method.service';

@Injectable()
export class BrewMethodEffects {

  search$ = createEffect(() => this.actions$.pipe(
    ofType(BrewMethodActions.getMany.type),
    mergeMap(a => this.service.getMany()
      .pipe(
        map(page => BrewMethodActions.getManySuccess({ page })),
        catchError((err: HttpErrorResponse) => of(BrewMethodActions.getManyFailure({errorMsg: err.message})))
      )),
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(BrewMethodActions.create.type),
    mergeMap(a => this.service.create(a.query)
      .pipe(
        map(item => BrewMethodActions.createSuccess({item})),
        catchError((err: HttpErrorResponse) => of(BrewMethodActions.createFailure({errorMsg: err.message})))
      )),
  ));

  constructor(
    private actions$: Actions<BrewMethodActions.ActionsUnion>,
    private service: BrewMethodService,
  ) {}
}
