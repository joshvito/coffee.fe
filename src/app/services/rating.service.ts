import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IRatings, ICreateRating } from '../models/rating.model';
import { IPageRequest, IPageResult, paramMapper } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getMany(query: Partial<IPageRequest> = {}): Observable<IPageResult<IRatings>> {
    return this.http.get<IPageResult<IRatings>>(`${environment.apiUrl}ratings`, { params: paramMapper(query) });
  }

  create(params: ICreateRating): Observable<IRatings> {
    return this.http.post<IRatings>(`${environment.apiUrl}ratings`, params);
  }

  update(params: IRatings): Observable<IRatings> {
    return this.http.put<IRatings>(`${environment.apiUrl}ratings/${params.id}`, params);
  }

  delete(id: number): Observable<IRatings> {
    return this.http.delete<IRatings>(`${environment.apiUrl}ratings/${id}`);
  }

}
