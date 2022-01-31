import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { CoffeeBeanActions } from '../actions';
import { CoffeeBeanService } from 'src/app/services/coffee-bean.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BeanEffects {

  search$ = createEffect(() => this.actions$.pipe(
    ofType(CoffeeBeanActions.getMany.type),
    mergeMap(a => this.coffeeBeanService.getMany()
      .pipe(
        map(page => CoffeeBeanActions.getManySuccess({ page })),
        catchError((err: HttpErrorResponse) => of(CoffeeBeanActions.getManyFailure({errorMsg: err.message})))
      )),
  ));

  constructor(
    private actions$: Actions<CoffeeBeanActions.ActionsUnion>,
    private coffeeBeanService: CoffeeBeanService,
  ) {}
}