import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


@Injectable()
export class DefaultHeaderInterceptor implements HttpInterceptor {
  /**
   * set default headers on outgoing requests
   */
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Clone the request and set wih credentials to be true.
    const authreq = req.clone({
      withCredentials: true
    });

    // send cloned request with header to the next handler.
    return next.handle(authreq);
  }
}
