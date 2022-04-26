import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IRating, ICreateRating } from '../models/rating.model';
import { IPageRequest, IPageResult, paramMapper } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getMany(query: Partial<IPageRequest> = {}): Observable<IPageResult<IRating>> {
    return this.http.get<IPageResult<IRating>>(`${environment.apiUrl}ratings`, { params: paramMapper(query) });
  }

  create(params: ICreateRating): Observable<IRating> {
    return this.http.post<IRating>(`${environment.apiUrl}ratings`, params);
  }

  update(params: IRating): Observable<IRating> {
    return this.http.put<IRating>(`${environment.apiUrl}ratings/${params.id}`, params);
  }

  delete(id: number): Observable<IRating> {
    return this.http.delete<IRating>(`${environment.apiUrl}ratings/${id}`);
  }

}
