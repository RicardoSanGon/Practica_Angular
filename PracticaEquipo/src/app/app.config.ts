import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { HttpClient,provideHttpClient,withInterceptors} from "@angular/common/http";
import { routes } from './app.routes';
import {errorshandlerInterceptor} from "./Core/Interceptors/errorshandler.interceptor";
import {tokenhandlerInterceptor} from "./Core/Interceptors/tokenhandler.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([tokenhandlerInterceptor,errorshandlerInterceptor])),
    HttpClient,provideAnimations(),provideToastr({timeOut:1200,preventDuplicates:false})]
};
