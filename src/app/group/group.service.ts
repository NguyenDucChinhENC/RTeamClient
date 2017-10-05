import { Injectable } from '@angular/core';
import { Headers, Response, URLSearchParams } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL} from '../app.routing';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupService {
  public apiURL;
  public apiMemberURL;
  constructor(private http: Http) {
    this.apiURL = URL + 'api/groups/';
    this.apiMemberURL = URL + 'api/member_groups/';
  }

  getGroupThumbnail(token: string, id_group: number): Observable<any> {
    const headers: any = {'RT-AUTH-TOKEN': token};  
    const option = new RequestOptions({headers: headers});
    const link = this.apiURL + id_group;
    return this.http.get(link, option).map(response => response.json());
  }

  getGroupList(token: string): Observable<any> {
    const headers: any = {'RT-AUTH-TOKEN': token};
    const option = new RequestOptions({headers: headers});
    return this.http.get(this.apiURL, option).map(response => response.json())
  }

  joinGroup(token: string, id_group: any): Observable<any> {
    const headers: any = {'RT-AUTH-TOKEN': token};
    const params = new HttpParams().set('id', id_group);
    const option = new RequestOptions({headers: headers});
    return this.http.post(URL + 'api/member_groups', {id: id_group} , option).map(response => response.json())
  }

  adminAcceptRequest(token: string, id_member_group: any): Observable<any>{
    const headers: any = {'RT-AUTH-TOKEN': token};
    const option = new RequestOptions({headers: headers})
    return this.http.patch(URL + 'api/member_groups/' + id_member_group,
      {member: {accept: "true"}}, option).map(response => response.json());
  }

  newGroup(token: string, value: any): Observable<any>{
    const headers: any = {'RT-AUTH-TOKEN': token};
    const option = new RequestOptions({headers: headers});
    console.log(value)
    return this.http.post(URL + 'api/groups', value, option).map(response => response.json())
  }

  deleteGroup(token: string, id_group: any): Observable<any>{
    const headers: any = {'RT-AUTH-TOKEN': token};
    const option = new RequestOptions({headers: headers})
    return this.http.delete(URL +'api/groups/' + id_group,
      option).map(response => response.json())
  }
}