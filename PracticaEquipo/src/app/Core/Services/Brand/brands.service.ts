import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {Brand} from "../../Interfaces/brand";
import {BrandByCatalogue} from "../../Interfaces/brand-by-catalogue";

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }

  createBrand(brand:Brand):Observable<MsgResponse>
  {
    return this.http.post<MsgResponse>('http://127.0.0.1:8000/api/create/brand',brand);
  }

  getBrands(id:number):Observable<BrandByCatalogue> {
    return this.http.get<BrandByCatalogue>('http://127.0.0.1:8000/api/catalogue/brand/'+id);
  }
}
