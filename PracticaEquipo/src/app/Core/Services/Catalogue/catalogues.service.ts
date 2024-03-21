import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogueIndex } from '../../Interfaces/catalogue-index';
import { MsgResponse } from '../../Interfaces/MsgResponse';
import {Catalogue} from "../../Interfaces/catalogue";
import {environment} from "../../../../environments/environments";

@Injectable({
  providedIn: 'root',
})
export class CataloguesService {
  constructor(private http: HttpClient) {}

  public getCatalogues(): Observable<CatalogueIndex> {
    return this.http.get<CatalogueIndex>(
      `${environment.apiUrl}/api/catalogues`
    );
  }
  public editCataloguee(catalogue:Catalogue): Observable<MsgResponse> {
    return this.http.put<MsgResponse>(`${environment.apiUrl}/api/catalogue/update/`+catalogue.id,catalogue)
  }
}
