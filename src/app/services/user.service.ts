import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../model/user.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlUserApi = environment.urlApi.concat('/user');

  constructor(private http: HttpClient) {
  }

  login(user: UserModel): Observable<any> {
    return this.http.post(environment.urlApi.concat('/auth'), user).pipe();
  }

  update(user: UserModel): Observable<any> {
    return this.http.put(this.urlUserApi, user).pipe();
  }

  create(user: UserModel): Observable<any> {
    return this.http.put(this.urlUserApi, user).pipe();
  }

  findAll(page: number, count: number): Observable<any> {
    return this.http.get(this.urlUserApi.concat('/' + page + '/' + count)).pipe();
  }

  findById(id: string): Observable<any> {
    return this.http.get(this.urlUserApi.concat('/' + id)).pipe();
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete(this.urlUserApi.concat('/' + id)).pipe();
  }

}
