import { Injectable } from '@angular/core';
import { Headers, Response, URLSearchParams } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL} from '../app.routing';
import 'rxjs/add/operator/map';

@Injectable()
export class EventService {
  public apiURL;
  constructor(private http: Http) {
    this.apiURL = URL + 'api/events';
  }

  newEvent(token: string, event: any, id_group: any): Observable<any>{
    const headers: any = {'RT-AUTH-TOKEN': token};
    const option = new RequestOptions({headers: headers});
    console.log({event ,  id_group: id_group});
    // return
    return this.http.post(this.apiURL, {event ,  id_group: id_group}, option).map(response => response.json())
  }

  getEvent(token:string, id_event: any): Observable<any>{
    const headers: any = {'RT-AUTH-TOKEN': token};
    const option = new RequestOptions({headers: headers});
    return this.http.get(this.apiURL + "/" + id_event, option).map(response => response.json())
  }

  updateEvent(token: string, id_event: any, value: any): Observable<any>{
    const headers: any = {'RT-AUTH-TOKEN': token};
    const option = new RequestOptions({headers: headers});
    return this.http.patch(this.apiURL + "/" + id_event, value, option).map(response => response.json())
  }

  joinEvent(token: string, id_event: any): Observable<any>{
    const headers: any = {'RT-AUTH-TOKEN': token};
    const option = new RequestOptions({headers: headers});
    return this.http.post(URL +'api/member_events', {id: id_event}, option).map(response => response.json())
  }

  cancelJoinEvent(token: string, id_member: any): Observable<any>{
    const headers: any = {'RT-AUTH-TOKEN': token};
    const option = new RequestOptions({headers: headers});
    return this.http.delete(URL + 'api/member_events/' + id_member, option).map(response => response.json())
  }

  addAdminEvent(token: string, event_id: any, user_id: any):Observable<any>{
    const headers: any = {'RT-AUTH-TOKEN': token};
    const option = new RequestOptions({headers: headers});
    return this.http.post(URL + 'api/admin_events', {event_id: event_id, user_id: user_id}, option).map(response => response.json())
  }
}