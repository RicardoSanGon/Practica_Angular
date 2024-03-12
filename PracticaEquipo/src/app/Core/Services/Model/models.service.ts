import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Models} from "../../Interfaces/models";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private http:HttpClient) { }

  public createModel(model: Models): Observable<MsgResponse>
  {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/model', model);
  }
}
