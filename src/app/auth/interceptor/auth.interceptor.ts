import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const idToken = localStorage.getItem("id_token");

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${idToken}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq);
};