import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { URL} from '../app.routes';

@Injectable()
export class ProfileService {
  public apiURL;
  constructor(private http: Http) {
    this.apiURL = URL + 'api/users/';
  }

  getInfoUser(token: any): Observable<any> {
    console.log(this.apiURL + token);
    return this.http.get(this.apiURL + token).map(response => response.json());
  }
}