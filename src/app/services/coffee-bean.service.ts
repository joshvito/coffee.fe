import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, of } from 'rxjs';
import { ICoffeeBean } from '../models/bean.model';
import { IPageResult } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeBeanService {

  constructor(private http: HttpClient) { }

  getMany(): Observable<IPageResult<ICoffeeBean>> {
    return this.http.get<IPageResult<ICoffeeBean>>(`${environment.apiUrl}beans`);
  }

}
