import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataBills } from '../../Interfaces/data-bills';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
  constructor(private http: HttpClient) {}

  public getBills(): Observable<DataBills> {
    return this.http.get<DataBills>('http://127.0.0.1:8000/api/bills');
  }
}
