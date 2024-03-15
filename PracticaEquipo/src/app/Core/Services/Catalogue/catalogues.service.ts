import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogueIndex } from '../../Interfaces/catalogue-index';
import { MsgResponse } from '../../Interfaces/MsgResponse';

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
  
  /*
  public editCatalogue(id:number): Observable<MsgResponse> {
    return this.http.put<MsgResponse>('http://127.0.0.1:8000/api/update-status/catalogues/'+id);
  } */
}
