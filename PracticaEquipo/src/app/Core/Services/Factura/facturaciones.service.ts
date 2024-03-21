import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataFacturacion} from "../../Interfaces/data-facturacion";
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class FacturacionesService {

  constructor(private http:HttpClient) { }

  getFacturaciones():Observable<DataFacturacion>{
    return this.http.get<DataFacturacion>(`${environment.apiUrl}/api/bills`);
  }
}
