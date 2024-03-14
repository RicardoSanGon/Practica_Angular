import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsgResponse } from '../../Interfaces/MsgResponse';
import { DataOrders } from '../../Interfaces/data-orders';
import { DataOrdenDetails } from '../../Interfaces/data-orden-details';
<<<<<<< HEAD
=======

>>>>>>> 455624cb4459d120303532939e1de5e93d61ba89

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
<<<<<<< HEAD
  constructor(private http: HttpClient) {}
=======


  constructor(private http:HttpClient) {}


>>>>>>> 455624cb4459d120303532939e1de5e93d61ba89

  public getOrders(): Observable<DataOrders> {
    return this.http.get<DataOrders>('http://127.0.0.1:8000/api/orders');
  }

<<<<<<< HEAD
  public createOrder(): Observable<MsgResponse> {
    return this.http.post<MsgResponse>(
      'http://127.0.0.1:8000/api/create/order',
      null
    );
  }

=======
  public createOrder(): Observable<MsgResponse>
    {
      return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/order',null);
    }
>>>>>>> 455624cb4459d120303532939e1de5e93d61ba89
  public getDetails(id: number): Observable<DataOrdenDetails> {
    return this.http.get<DataOrdenDetails>(
      'http://127.0.0.1:8000/api/order/details/' + id
    );
  }

}
<<<<<<< HEAD
=======

>>>>>>> 455624cb4459d120303532939e1de5e93d61ba89
