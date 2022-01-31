import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IBrewRatings } from '../models/brew-ratings.model';
import { IPageResult } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getMany(): Observable<IPageResult<IBrewRatings>> {
    return this.http.get<IPageResult<IBrewRatings>>(`${environment.apiUrl}ratings`);
  }

}
