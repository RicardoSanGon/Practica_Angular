import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Models} from "../../Interfaces/models";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {DataModels} from "../../Interfaces/data-models";

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private http:HttpClient) { }

  public createModel(model: Models): Observable<MsgResponse>
  {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/model', model);
  }
  public getModels(): Observable<DataModels>
  {return this.http.get<DataModels>('http://127.0.0.1:8000/api/models')}

  public updateModel(model: Models): Observable<MsgResponse>
  {return this.http.put<MsgResponse>('http://127.0.0.1:8000/api/model/update/'+model.id, model)}
}
