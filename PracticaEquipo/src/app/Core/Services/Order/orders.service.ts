<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataOrders } from '../../Interfaces/data-orders';
import { Observable } from 'rxjs';
=======
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
>>>>>>> a256896e9662fba2650390e1ebcc9fdb1d2f430c

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
<<<<<<< HEAD
  constructor(private http:HttpClient) {}

  public getOrders(): Observable<DataOrders> {
    return this.http.get<DataOrders>('http://127.0.0.1:8000/api/suppliers');
  }


=======

  constructor(private http:HttpClient) { }

  public createOrder(): Observable<MsgResponse>
  {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/order',null);
  }
>>>>>>> a256896e9662fba2650390e1ebcc9fdb1d2f430c
}
