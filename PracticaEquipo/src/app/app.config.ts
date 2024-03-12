import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient,provideHttpClient,withInterceptors} from "@angular/common/http";
import { routes } from './app.routes';
import {errorshandlerInterceptor} from "./Core/Interceptors/errorshandler.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([errorshandlerInterceptor])), HttpClient]
};
