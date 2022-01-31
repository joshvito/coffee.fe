import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IBrewMethod } from '../models/brew-method.model';
import { IPageResult } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class BrewMethodService {

  constructor(private http: HttpClient) { }

  getMany(): Observable<IPageResult<IBrewMethod>> {
    return this.http.get<IPageResult<IBrewMethod>>(`${environment.apiUrl}brew-methods`);
  }

}
