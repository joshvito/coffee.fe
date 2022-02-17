import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { LayoutActions, UserActions } from '../actions';
import { environment } from '@environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { LayoutView } from 'src/app/models/layout.model';
import * as fromRoot from '../reducers';

@Injectable()
export class UserEffects implements OnInitEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login.type),
    tap(_ => {
        window.location.href = `${environment.apiUrl}auth/redirect`
    })
  ), {dispatch: false});

  current$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getCurrent.type),
    mergeMap(a => this.userService.getCurrent().pipe(
      map(user => UserActions.getCurrentSuccess({user})),
      catchError(errorMsg => of(UserActions.getCurrentFailure({errorMsg})))
    ))
  ));

  currentSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getCurrentSuccess.type),
    tap(_ =>  this.store.dispatch(LayoutActions.change({view: LayoutView.Ratings})))
  ), {dispatch: false});

  constructor(
    private actions$: Actions<UserActions.ActionsUnion>,
    private store: Store<fromRoot.State>,
    private userService: UserService
  ) {}

  ngrxOnInitEffects(): Action {
    return UserActions.getCurrent();
  }
}
