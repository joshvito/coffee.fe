import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { ICoffeeBean, ICreateBean } from '../models/bean.model';
import { IPageRequest, IPageResult, paramMapper } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeBeanService {

  constructor(private http: HttpClient) { }

  getMany(pageRequest: IPageRequest): Observable<IPageResult<ICoffeeBean>> {
    return this.http.get<IPageResult<ICoffeeBean>>(`${environment.apiUrl}beans`, { params: paramMapper(pageRequest) });
  }

  create(params: ICreateBean): Observable<ICoffeeBean> {
    return this.http.post<ICoffeeBean>(`${environment.apiUrl}beans`, params);
  }
}
