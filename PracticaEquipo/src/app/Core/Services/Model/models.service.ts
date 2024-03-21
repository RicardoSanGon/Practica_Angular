import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Models} from "../../Interfaces/models";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {DataModels} from "../../Interfaces/data-models";
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private http:HttpClient) { }

  public createModel(model: Models): Observable<MsgResponse>
  {
    return this.http.post<MsgResponse>(`${environment.apiUrl}/api/create/model`, model);
  }
  public getModels(): Observable<DataModels>
  {return this.http.get<DataModels>(`${environment.apiUrl}/api/models`)}

  public updateModel(model: Models): Observable<MsgResponse>
  {return this.http.put<MsgResponse>(`${environment.apiUrl}/api/model/update/`+model.id, model)}
}
