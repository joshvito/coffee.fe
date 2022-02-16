import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IBrewRatings, ICreateBrewRating, IFilterBrewRatings } from '../models/brew-ratings.model';
import { IPageResult } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getMany(filters: Partial<IFilterBrewRatings> = {}): Observable<IPageResult<IBrewRatings>> {
    let params = new HttpParams();

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

    return this.http.get<IPageResult<IBrewRatings>>(`${environment.apiUrl}ratings`, { params });
  }

  create(params: ICreateBrewRating): Observable<IBrewRatings> {
    return this.http.post<IBrewRatings>(`${environment.apiUrl}ratings`, params);
  }

  delete(id: number): Observable<IBrewRatings> {
    return this.http.delete<IBrewRatings>(`${environment.apiUrl}ratings/${id}`);
  }

}
