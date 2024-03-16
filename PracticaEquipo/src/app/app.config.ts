import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { HttpClient,provideHttpClient,withInterceptors} from "@angular/common/http";
import { routes } from './app.routes';
import {errorshandlerInterceptor} from "./Core/Interceptors/errorshandler.interceptor";
import {tokenhandlerInterceptor} from "./Core/Interceptors/tokenhandler.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([tokenhandlerInterceptor,errorshandlerInterceptor])),
    HttpClient]
};
