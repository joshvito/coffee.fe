import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { UserActions } from '../actions';
import { environment } from '@environments/environment';

@Injectable()
export class UserEffects {

  search$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login.type),
    tap(a => {
      window.location.href = `${environment.apiUrl}auth/redirect`;
      //this.location.go(`${environment.apiUrl}auth/redirect`)
    })
  ), { dispatch: false});

  constructor(
    private actions$: Actions<UserActions.ActionsUnion>,
    private location: Location
  ) {}
}
