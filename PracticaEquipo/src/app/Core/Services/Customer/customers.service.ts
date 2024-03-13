import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customerstore } from '../../Interfaces/customerstore';
import { DataCustomer } from '../../Interfaces/data-customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  public createCustomer(customer: Customerstore) {
    return this.http.post(
      'http://127.0.0.1:8000/api/create/customer',
      customer
    );
  }

  public getCustomer(): Observable<DataCustomer> {
    return this.http.get<DataCustomer>('http://127.0.0.1:8000/api/customers');
  }
}