import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, tap } from "rxjs/operators";
import { UserActions } from '../actions';
import { environment } from '@environments/environment';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UserEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login.type),
    tap(_ => {
        window.location.href = `${environment.apiUrl}auth/redirect`
    })
  ), {dispatch: false});

  constructor(
    private actions$: Actions<UserActions.ActionsUnion>,
    private userService: UserService
  ) {}
}
