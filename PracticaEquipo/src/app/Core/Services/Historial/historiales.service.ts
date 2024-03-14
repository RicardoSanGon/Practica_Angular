import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataHistorial} from "../../Interfaces/data-historial";

@Injectable({
  providedIn: 'root'
})
export class HistorialesService {

  constructor(private http:HttpClient) { }

  getHistoriales():Observable<DataHistorial>{
    return this.http.get<DataHistorial>('http://127.0.0.1:8000/api/history');
  }
}
