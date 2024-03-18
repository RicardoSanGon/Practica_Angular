import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Log} from "../../Interfaces/log";

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http:HttpClient) { }

  getLogs():Observable<Log[]>{
    return this.http.get<Log[]>('http://127.0.0.1:8000/api/log');
  }
}
