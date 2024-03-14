import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataFacturacion} from "../../Interfaces/data-facturacion";

@Injectable({
  providedIn: 'root'
})
export class FacturacionesService {

  constructor(private http:HttpClient) { }

  getFacturaciones():Observable<DataFacturacion>{
    return this.http.get<DataFacturacion>('http://127.0.0.1:8000/api/bills');
  }
}
