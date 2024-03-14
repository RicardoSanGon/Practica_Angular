import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {DataOrders} from "../../Interfaces/data-orders";


=======
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsgResponse } from '../../Interfaces/MsgResponse';
import { DataOrders } from '../../Interfaces/data-orders';
import { DataOrdenDetails } from '../../Interfaces/data-orden-details';
>>>>>>> 3ba9dd1f508ba4bc56f9d25e52a6aee5b671a7db

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
<<<<<<< HEAD

  constructor(private http:HttpClient) {}
=======
  constructor(private http: HttpClient) {}
>>>>>>> 3ba9dd1f508ba4bc56f9d25e52a6aee5b671a7db

  public getOrders(): Observable<DataOrders> {
    return this.http.get<DataOrders>('http://127.0.0.1:8000/api/orders');
  }
<<<<<<< HEAD
  public createOrder(): Observable<MsgResponse>
    {
      return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/order',null);
    }

}





=======
  public createOrder(): Observable<MsgResponse> {
    return this.http.post<MsgResponse>(
      'http://127.0.0.1:8000/api/create/order',
      null
    );
  }
  public getDetails(id: number): Observable<DataOrdenDetails> {
    return this.http.get<DataOrdenDetails>(
      'http://127.0.0.1:8000/api/order/details/' + id
    );
  }
}
>>>>>>> 3ba9dd1f508ba4bc56f9d25e52a6aee5b671a7db
