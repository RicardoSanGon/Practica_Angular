import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customerstore } from '../../Interfaces/customerstore';
import { DataCustomer } from '../../Interfaces/data-customer';
import { Observable } from 'rxjs';
import {UCustomer} from "../../Interfaces/ucustomer";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  public createCustomer(customer: Customerstore) {
    return this.http.post(
      `${environment.apiUrl}/api/create/customer`,
      customer
    );
  }

  public getCustomer(): Observable<DataCustomer> {
    return this.http.get<DataCustomer>(`${environment.apiUrl}/api/customers`);
  }

  updateCustomer(customer: UCustomer): Observable<MsgResponse> {
    return this.http.put<MsgResponse>('http://127.0.0.1:8000/api/customer/update', customer); }
}
