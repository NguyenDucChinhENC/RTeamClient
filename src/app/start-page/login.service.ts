import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URL} from '../app.routes';

@Injectable()
export class LoginService {
  public apiURL;
  constructor(private http: Http) {
    this.apiURL = URL + 'api/sign_in';
  }

  login(data: any): Observable<any> {
    console.log(data.value);
    return this.http.post(this.apiURL, data.value);
  }
}