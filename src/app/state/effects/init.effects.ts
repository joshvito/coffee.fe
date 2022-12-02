import { Injectable } from '@angular/core';
import { ofType, Actions, ROOT_EFFECTS_INIT, createEffect } from '@ngrx/effects';
import { mergeMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class InitEffects {
  init$ =  createEffect(() =>this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    mergeMap(_ => {
      return this.userService.getCsrf()
    })
  ), { dispatch: false});

  constructor(private actions$: Actions, private userService: UserService) {}
}
