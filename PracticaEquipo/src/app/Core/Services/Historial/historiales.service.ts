import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataHistorial} from "../../Interfaces/data-historial";
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class HistorialesService {

  constructor(private http:HttpClient) { }

  getHistoriales():Observable<DataHistorial>{
    return this.http.get<DataHistorial>(`${environment.apiUrl}/api/history`);
  }
}
