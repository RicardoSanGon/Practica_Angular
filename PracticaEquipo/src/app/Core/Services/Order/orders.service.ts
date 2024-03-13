import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataOrders } from '../../Interfaces/data-orders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http:HttpClient) {}

  public getOrders(): Observable<DataOrders> {
    return this.http.get<DataOrders>('http://127.0.0.1:8000/api/suppliers');
  }


}
