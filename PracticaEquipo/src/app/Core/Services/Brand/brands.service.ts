import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MsgResponse} from "../../Interfaces/MsgResponse";
import {Brand} from "../../Interfaces/brand";
import {BrandByCatalogue} from "../../Interfaces/brand-by-catalogue";
import { DataBrands } from '../../Interfaces/data-brands';
import {Brands} from "../../Interfaces/brands";
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }

  createBrand(brand:Brand):Observable<MsgResponse>
  {
    return this.http.post<MsgResponse>(`${environment.apiUrl}/api/create/brand`,brand);
  }

  getBrands(id:number):Observable<BrandByCatalogue> {
    return this.http.get<BrandByCatalogue>(`${environment.apiUrl}/api/catalogue/brand/`+id);
  }
  tabgetBrands(): Observable<DataBrands> {
    return this.http.get<DataBrands>(`${environment.apiUrl}/api/brands`);
  }

  updateBrand(brand:Brands):Observable<MsgResponse>
  {
    return this.http.put<MsgResponse>(`${environment.apiUrl}/api/brand/update/`+brand.id, brand);
  }


}
