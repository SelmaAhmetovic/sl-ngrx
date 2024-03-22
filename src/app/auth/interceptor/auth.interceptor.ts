import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { CookieService } from "ngx-cookie-service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {

let idToken = inject(CookieService).get('id_token');

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${idToken}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};