import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IBrewRatings, ICreateBrewRating } from '../models/brew-ratings.model';
import { IPageRequest, IPageResult, paramMapper } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getMany(query: Partial<IPageRequest> = {}): Observable<IPageResult<IBrewRatings>> {
    return this.http.get<IPageResult<IBrewRatings>>(`${environment.apiUrl}ratings`, { params: paramMapper(query) });
  }

  create(params: ICreateBrewRating): Observable<IBrewRatings> {
    return this.http.post<IBrewRatings>(`${environment.apiUrl}ratings`, params);
  }

  update(params: IBrewRatings): Observable<IBrewRatings> {
    return this.http.put<IBrewRatings>(`${environment.apiUrl}ratings/${params.id}`, params);
  }

  delete(id: number): Observable<IBrewRatings> {
    return this.http.delete<IBrewRatings>(`${environment.apiUrl}ratings/${id}`);
  }

}
