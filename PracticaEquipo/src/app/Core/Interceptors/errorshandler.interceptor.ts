import { HttpInterceptorFn } from '@angular/common/http';
import { throwError} from "rxjs";
import { catchError } from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

export const errorshandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    return throwError(error);
  }));
};
