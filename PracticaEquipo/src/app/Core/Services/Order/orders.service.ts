
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {DataOrders} from "../../Interfaces/data-orders";



@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) {}

  public getOrders(): Observable<DataOrders> {
    return this.http.get<DataOrders>('http://127.0.0.1:8000/api/orders');
  }
  public createOrder(): Observable<MsgResponse>
    {
      return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/order',null);
    }

}





