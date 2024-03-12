import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLogIn} from "../../Interfaces/user-log-in";
import {LogInResponse} from "../../Interfaces/log-in-response";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  LogInUser(user: UserLogIn):Observable<LogInResponse> {
    return this.http.post<LogInResponse>('http://127.0.0.1:8000/api/login', user);
  }
}
