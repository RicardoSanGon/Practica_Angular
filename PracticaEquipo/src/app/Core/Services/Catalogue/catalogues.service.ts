import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogueIndex } from '../../Interfaces/catalogue-index';
import { MsgResponse } from '../../Interfaces/MsgResponse';
import {Catalogue} from "../../Interfaces/catalogue";

@Injectable({
  providedIn: 'root',
})
export class CataloguesService {
  constructor(private http: HttpClient) {}

  public getCatalogues(): Observable<CatalogueIndex> {
    return this.http.get<CatalogueIndex>(
      'http://127.0.0.1:8000/api/catalogues'
    );
  }
  public editCataloguee(catalogue:Catalogue): Observable<MsgResponse> {
    return this.http.put<MsgResponse>('http://127.0.0.1:8000/api/catalogue/update/'+catalogue.id,catalogue)
  }
}
