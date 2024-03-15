import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {DataDetalle} from "../../Interfaces/data-detalle";
import {DetalleStore} from "../../Interfaces/detalle-store";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

constructor(private http:HttpClient) { }

public getDetails(id:number|null=null):Observable<DataDetalle> {
  return this.http.get<DataDetalle>('http://127.0.0.1:8000/api/order/details/'+id);
}

  changeStatus(detalle:DetalleStore, id: number) {
    return this.http.put('http://127.0.0.1:8000/api/order/details/status/'+id,detalle);

  }
}
