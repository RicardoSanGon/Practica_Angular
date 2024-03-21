import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsgResponse } from '../../Interfaces/MsgResponse';
import { DataOrders } from '../../Interfaces/data-orders';
import { DataOrdenDetails } from '../../Interfaces/data-orden-details';
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  public getOrders(): Observable<DataOrders> {
    return this.http.get<DataOrders>(`${environment.apiUrl}/api/orders`);
  }

  public createOrder(): Observable<MsgResponse> {
    return this.http.post<MsgResponse>(
      `${environment.apiUrl}/api/create/order`,
      null
    );
  }

  public getDetails(id: number): Observable<DataOrdenDetails> {
    return this.http.get<DataOrdenDetails>(
      `${environment.apiUrl}/api/order/details/` + id
    );
  }
}
