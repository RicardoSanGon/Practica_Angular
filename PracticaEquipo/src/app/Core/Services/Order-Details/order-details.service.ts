import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataOrdenDetails } from '../../Interfaces/data-orden-details';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

constructor(private http:HttpClient) { }

public getDetails(id:number):Observable<DataOrdenDetails> {
  return this.http.get<DataOrdenDetails>('http://127.0.0.1:8000/api/order/details/'+id);
}

}
