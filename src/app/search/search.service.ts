import { Injectable } from '@angular/core';
import { Headers, Response, URLSearchParams } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL} from '../app.routing';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  public apiURL;
  public apiMemberURL;
  constructor(private http: Http) {
  }

  search(value: any): Observable<any>{
      const link = URL + 'api/search?q=' + value;
      return this.http.get(link).map(response => response.json());
  }
}