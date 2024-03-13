import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {Inventory} from "../../Interfaces/inventory";

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  constructor(private http:HttpClient) { }

  public addInventory(inventory: Inventory):Observable<MsgResponse> {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/inventorie/add', inventory);
  }
}
