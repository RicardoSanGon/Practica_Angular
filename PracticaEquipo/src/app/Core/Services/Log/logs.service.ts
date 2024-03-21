import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Log} from "../../Interfaces/log";
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http:HttpClient) { }

  getLogs():Observable<Log[]>{
    return this.http.get<Log[]>(`${environment.apiUrl}/api/log`);
  }
}
