import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IBrew, ICreateBrew, IFilterBrew } from '../models/brew.model';
import { addPageParams, IPageResult } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class BrewService {

  constructor(private http: HttpClient) { }

  getMany(filters: Partial<IFilterBrew> = {}): Observable<IPageResult<IBrew>> {
    let params = addPageParams(new HttpParams(), filters);

    if (filters.beans && Object.keys(filters.beans).length) {
      params =  Object.keys(filters.beans).reduce((accum, id) => {
        if(!filters.beans![Number(id)]) return accum;
        return accum.append('beans[]', id);
      }, params);
    }

    if (filters.methods && Object.keys(filters.methods).length) {
      params =  Object.keys(filters.methods).reduce((accum, id) => {
        if(!filters.methods![Number(id)]) return accum;
        return accum.append('methods[]', id);
      }, params);
    }

    return this.http.get<IPageResult<IBrew>>(`${environment.apiUrl}brews`, { params });
  }

  create(params: ICreateBrew): Observable<IBrew> {
    return this.http.post<IBrew>(`${environment.apiUrl}brews`, params);
  }

  update(params: IBrew): Observable<IBrew> {
    return this.http.put<IBrew>(`${environment.apiUrl}brews/${params.id}`, params);
  }

  delete(id: number): Observable<IBrew> {
    return this.http.delete<IBrew>(`${environment.apiUrl}brews/${id}`);
  }

}
