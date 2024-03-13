import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  public createOrder(): Observable<MsgResponse>
  {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/order',null);
  }
}
