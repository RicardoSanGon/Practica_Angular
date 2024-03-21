import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsgResponse } from '../../Interfaces/MsgResponse';
import { Supplier } from '../../Interfaces/supplier';
import { DataSuppliers } from '../../Interfaces/data-suppliers';
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}

  public createSupplier(supplier: Supplier): Observable<MsgResponse> {
    return this.http.post<MsgResponse>(
      `${environment.apiUrl}/api/create/supplier`,
      supplier
    );
  }

  public getSuppliers(): Observable<DataSuppliers> {
    return this.http.get<DataSuppliers>(`${environment.apiUrl}/api/suppliers`);
  }

  public updateSupplier(supplier: Supplier): Observable<MsgResponse> {
    return this.http.put<MsgResponse>(`${environment.apiUrl}/api/supplier/update/`+supplier.id, supplier);
  }
}
