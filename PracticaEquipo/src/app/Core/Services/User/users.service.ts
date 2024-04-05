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
import {User} from "../../Interfaces/user";
import {UserData} from "../../Interfaces/user-data";
import {RolData} from "../../Interfaces/rol-data";
import {UCustomer} from "../../Interfaces/ucustomer";
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  LogInUser(user: UserLogIn):Observable<LogInResponse> {
    return this.http.post<LogInResponse>(`${environment.apiUrl}/api/login`, user);
  }

  createUser(user: UserForm):Observable<MsgResponse> {
    return this.http.post<MsgResponse>(`${environment.apiUrl}/api/create/user`,user);
  }

  isAdmin():Observable<IsAdmin> {
    return this.http.get<IsAdmin>(`${environment.apiUrl}/api/is_admin`);
  }

  isClient():Observable<IsCustomer>
  {
    return this.http.get<IsCustomer>(`${environment.apiUrl}/api/is_customer`);
  }

  isGuest():Observable<IsGuest>
  {
    return this.http.get<IsGuest>(`${environment.apiUrl}/api/is_guest`);
  }

  isUser():Observable<IsUser>
  {
    return this.http.get<IsUser>(`${environment.apiUrl}/api/is_user`);
  }

  CodeVerification(code: Code):Observable<MsgResponse> {
    return this.http.post<MsgResponse>(`${environment.apiUrl}/api/verification/code`, code);
  }

  LogOut():Observable<MsgResponse> {
    return this.http.get<MsgResponse>(`${environment.apiUrl}/api/logout`);
  }

  is_Auth():Observable<IsAuth> {
    return this.http.get<IsAuth>(`${environment.apiUrl}/api/is_auth`);
  }

  is_Auth2():Observable<IsCodeVerified>
  {
    return this.http.get<IsCodeVerified>(`${environment.apiUrl}/api/is_code_verified`);
  }

  getUsers():Observable<UserData> {
    return this.http.get<UserData>(`${environment.apiUrl}/api/users`)
  }

  updateUser(user: User):Observable<MsgResponse> {
    return this.http.put<MsgResponse>(`${environment.apiUrl}/api/user/update/`+user.id, user);
  }


  getRols():Observable<RolData> {
    return this.http.get<RolData>(`${environment.apiUrl}/api/rols`);
  }

  getOneCustomer():Observable<UCustomer> {
    return this.http.get<UCustomer>(`${environment.apiUrl}/api/user/customer`);
  }

  sendMessage(message:String):Observable<MsgResponse> {
    return this.http.post<MsgResponse>(`${environment.apiUrl}/api/send/message`, {message:message});
  }
}
