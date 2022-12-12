import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetail } from '../classes/user-detail';
import { UsergroupDetail } from '../classes/usergroup-detail';
import { Router } from '@angular/router';
import { GroupDetail } from '../classes/group-detail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groupBaseUrl = environment.apiURL + 'group';
  private userGroupBaseUrl = environment.apiURL + 'user-group';

  constructor(private http: HttpClient, private router: Router) {}



  createGroup(groupDetail: GroupDetail): Observable<any> {
    console.log(groupDetail);
    
    //let url = this.groupBaseUrl + "/create";
    //return this.http.post(url,groupDetail);

    let url = this.groupBaseUrl + '/create';
    // let token = localStorage.getItem('token');


    //const headers = new HttpParams().set('Authorization', "Bearer " + token);
    // const headerDict = {
    //   /* 'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type', */
    //   'Authorization': 'Bearer ' + token
    // }
    
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}` });
    // let options = { headers: headers };
    // console.log(options.headers);

    return this.http.post(url, groupDetail);

    // TODO: this under - Authetication Bearer via Token
    // let url = this.groupBaseUrl + "/create";
    // 	return this.http.get(url,{
    // 	headers: {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE2NjkzNzMwMTUsImV4cCI6MTY2OTM5MTAxNX0.mnFwXzRUMTbmYU0xfRn78xgVDQtFJtEbty5-oPukUHQ"},
    // 	params: groupDetail
    // });
  }
  getGroupInfo(groupName: any): Observable<any> {
    console.log(groupName);

    return this.http.get(
      this.groupBaseUrl + '/group-name/{groupName}?groupName=' +
        groupName
    );

    // TODO: this under - Authetication Bearer via Token
    // let url = this.groupBaseUrl + "/create";
    // 	return this.http.get(url,{
    // 	headers: {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE2NjkzNzMwMTUsImV4cCI6MTY2OTM5MTAxNX0.mnFwXzRUMTbmYU0xfRn78xgVDQtFJtEbty5-oPukUHQ"},
    // 	params: groupDetail
    // });
  }
  joinGroup(usergroupDetail: UsergroupDetail): Observable<any> {
    console.log(usergroupDetail);

    let url = this.userGroupBaseUrl + '/update';
    return this.http.post(url, usergroupDetail);

    // TODO: this under - Authetication Bearer via Token
    // let url = this.groupBaseUrl + "/create";
    // 	return this.http.get(url,{
    // 	headers: {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE2NjkzNzMwMTUsImV4cCI6MTY2OTM5MTAxNX0.mnFwXzRUMTbmYU0xfRn78xgVDQtFJtEbty5-oPukUHQ"},
    // 	params: groupDetail
    // });
  }

  getMembers(){

  }

  getAllGroups(){
    let url = this.groupBaseUrl + '/groups';
    console.log("getAllGroups")

    // let token = localStorage.getItem('token');
    
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}` });
    // let options = { headers: headers };

    // let headers2 = new HttpHeaders({ 'Content-Type': 'application/json' });
    // headers2 = headers2.append('Authorization', 'Bearer ' + token); 

    return this.http.get(url);
  }

}
