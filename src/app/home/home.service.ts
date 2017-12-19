import { Injectable } from '@angular/core';
import { Headers, Response, URLSearchParams } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL} from '../app.routing';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
  public apiURL;
  constructor(private http: Http) {
      this.apiURL = URL + 'api/events'
  }

  getEvent(token: string):Observable<any>{
    const headers: any = {'RT-AUTH-TOKEN': token};  
    const option = new RequestOptions({headers: headers});
    return this.http.get(this.apiURL, option).map(response => response.json())
  }
}