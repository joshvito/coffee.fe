import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCsrf(): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}sanctum/csrf-cookie`);
  }

  getCurrent(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}user`);
  }

}
