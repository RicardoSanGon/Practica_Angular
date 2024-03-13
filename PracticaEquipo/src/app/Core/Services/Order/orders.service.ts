
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
<<<<<<< HEAD
import { DataOrders } from '../../Interfaces/data-orders';
=======
import {DataOrders} from "../../Interfaces/data-orders";

>>>>>>> 8f52516fd76a96857b185325102c9cf6c8baf151

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
<<<<<<< HEAD
=======

>>>>>>> 8f52516fd76a96857b185325102c9cf6c8baf151
  constructor(private http:HttpClient) {}

  public getOrders(): Observable<DataOrders> {
    return this.http.get<DataOrders>('http://127.0.0.1:8000/api/orders');
  }
  public createOrder(): Observable<MsgResponse>
    {
      return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/order',null);
    }
  }


<<<<<<< HEAD
}
=======


>>>>>>> 8f52516fd76a96857b185325102c9cf6c8baf151
