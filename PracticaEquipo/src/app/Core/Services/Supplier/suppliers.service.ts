import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {Supplier} from "../../Interfaces/supplier";
import {DataSuppliers} from "../../Interfaces/data-suppliers";

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http:HttpClient) { }

  public createSupplier(supplier:Supplier):Observable<MsgResponse>
  {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/supplier', supplier);
  }

  public getSuppliers():Observable<DataSuppliers>
  {
    return this.http.get<DataSuppliers>('http://127.0.0.1:8000/api/suppliers');
  }
}
