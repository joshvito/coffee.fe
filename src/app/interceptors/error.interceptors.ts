import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, throwError } from 'rxjs';
import { UserActions } from '../state/actions';
import { State } from '../state/reducers';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<State>,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if(error.status === 401) {
            this.store.dispatch(UserActions.login());
          }
          return throwError(() => error);
        })
      )
  }
}
