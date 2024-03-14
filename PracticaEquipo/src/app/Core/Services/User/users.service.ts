import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserLogIn} from "../../Interfaces/user-log-in";
import {LogInResponse} from "../../Interfaces/log-in-response";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {UserForm} from "../../Interfaces/user-form";
import {IsAdmin} from "../../Interfaces/is-admin";
import {IsCustomer} from "../../Interfaces/is-customer";
import {IsGuest} from "../../Interfaces/is-guest";
import {IsUser} from "../../Interfaces/is-user";
import {Code} from "../../Interfaces/code";
import {IsAuth} from "../../Interfaces/is-auth";
import {IsCodeVerified} from "../../Interfaces/is-code-verified";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  LogInUser(user: UserLogIn):Observable<LogInResponse> {
    return this.http.post<LogInResponse>('http://127.0.0.1:8000/api/login', user);
  }

  createUser(user: UserForm):Observable<MsgResponse> {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/user',user);
  }

  isAdmin():Observable<IsAdmin> {
    return this.http.get<IsAdmin>('http://127.0.0.1:8000/api/is_admin');
  }

  isClient():Observable<IsCustomer>
  {
    return this.http.get<IsCustomer>('http://127.0.0.1:8000/api/is_customer');
  }

  isGuest():Observable<IsGuest>
  {
    return this.http.get<IsGuest>('http://127.0.0.1:8000/api/is_guest');
  }

  isUser():Observable<IsUser>
  {
    return this.http.get<IsUser>('http://127.0.0.1:8000/api/is_user');
  }

  CodeVerification(code: Code):Observable<MsgResponse> {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/verification/code', code);
  }

  LogOut():Observable<MsgResponse> {
    return this.http.get<MsgResponse>('http://127.0.0.1:8000/api/logout');
  }

  is_Auth():Observable<IsAuth> {
    return this.http.get<IsAuth>('http://127.0.0.1:8000/api/is_auth');
  }

  is_Auth2():Observable<IsCodeVerified>
  {
    return this.http.get<IsCodeVerified>('http://127.0.0.1:8000/api/is_code_verified');
  }
}
