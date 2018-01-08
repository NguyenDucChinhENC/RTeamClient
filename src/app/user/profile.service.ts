import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URL} from '../app.routing';
import { User } from './user'

@Injectable()
export class ProfileService {
  public apiURL;
  constructor(private http: Http) {
    this.apiURL = URL + 'api/users/';
  }

  getInfoUser(id: any): Observable<any> {
    console.log(this.apiURL + id);
    return this.http.get(this.apiURL + id).map((response: Response) => {
    return <User>response.json().data.user});
  }

  updateUser(value: any, id: any, token: any): Observable<any> {
    const headers: any = {'RT-AUTH-TOKEN': token};
    const options = new RequestOptions({headers: headers});
    console.log(value);
    return this.http.patch(this.apiURL + id, value, options );
  }

  changeAvatar(ava, id: number, token: string): Observable<any> {
    const apiurl = URL + 'api/users/' + id;
    const headers: any = {'RT-AUTH-TOKEN': token };
    const options = new RequestOptions({headers: headers});
    return this.http.patch(apiurl, ava, options);
  }

  logout(token: string): Observable<any> {
    const headers: any = {'RT-AUTH-TOKEN': token};  
    const option = new RequestOptions({headers: headers})
    console.log(option);
    return this.http.delete(URL + 'api/sign_out', option);
  }
}