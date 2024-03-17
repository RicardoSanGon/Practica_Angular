import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {Inventory} from "../../Interfaces/inventory";
import { DataInventory } from '../../Interfaces/data-inventory';
import {Inventories} from "../../Interfaces/inventories";

@Injectable({
  providedIn: 'root'
})
export class InventoriesService {

  constructor(private http:HttpClient) { }

  public addInventory(inventory: Inventory):Observable<MsgResponse> {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/inventorie/add', inventory);
  }
  public getInventory(): Observable<DataInventory> {
    return this.http.get<DataInventory>('http://127.0.0.1:8000/api/inventories');
    }

  updateInventory(modifyInventory: Inventories):Observable<MsgResponse> {
    return this.http.put<MsgResponse>('http://127.0.0.1:8000/api/inventory/update/'+modifyInventory.id, modifyInventory);
  }
}
