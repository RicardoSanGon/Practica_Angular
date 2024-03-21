import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {Inventory} from "../../Interfaces/inventory";
import { DataInventory } from '../../Interfaces/data-inventory';
import {Inventories} from "../../Interfaces/inventories";
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  constructor(private http:HttpClient) { }

  public addInventory(inventory: Inventory):Observable<MsgResponse> {
    return this.http.post<MsgResponse>(`${environment.apiUrl}/api/inventorie/add`, inventory);
  }
  public getInventory(): Observable<DataInventory> {
    return this.http.get<DataInventory>(`${environment.apiUrl}/api/inventories`);
    }

  updateInventory(modifyInventory: Inventories):Observable<MsgResponse> {
    return this.http.put<MsgResponse>(`${environment.apiUrl}/api/inventory/update/`+modifyInventory.id, modifyInventory);
  }
}
