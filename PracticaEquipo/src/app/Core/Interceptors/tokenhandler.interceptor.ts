import { HttpInterceptorFn } from '@angular/common/http';

export const tokenhandlerInterceptor: HttpInterceptorFn = (req, next) => {
  let headers = req.headers;
  let token = localStorage.getItem('token');
  if (token) {
    headers = headers.set('Authorization', 'Bearer ' + token);
  }
  headers = headers.set('Accept', 'application/json');
  req = req.clone({headers: headers});
  return next(req);
};
