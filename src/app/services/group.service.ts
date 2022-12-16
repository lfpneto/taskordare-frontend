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
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private groupBaseUrl = environment.apiURL + 'group';
  private groupConfigBaseUrl = environment.apiURL + 'group-config';
  private userGroupBaseUrl = environment.apiURL + 'user-group';
  private userProfileBaseUrl = environment.apiURL + 'user-profile';


  constructor(private http: HttpClient, private router: Router) {}



  createGroup(groupDetail: GroupDetail): Observable<any> {
    let formData = {
      "userId" : localStorage.getItem('id'),
      "group" : {
        "id": 0,
        "groupName": groupDetail.groupName,
        "description": groupDetail.description
      }
    };
    console.log(formData);
    let url = this.groupConfigBaseUrl + '/create-group';
    return this.http.post(url, formData);
  }

  getGroupInfo(groupName: any): Observable<any> {
    console.log(groupName);

    return this.http.get(
      this.groupBaseUrl + '/group-name/{groupName}?groupName=' +
        groupName
    );
  }

  joinGroup(usergroupDetail: UsergroupDetail): Observable<any> {
    let url = this.userGroupBaseUrl + '/update';
    return this.http.post(url, usergroupDetail);
  }

  getMembersOfGroup(id: any){
    let url = this.groupConfigBaseUrl + '/get-members';
    return this.http.get(url + "/" + id);
  }

  getAllGroups(){
    let url = this.groupBaseUrl + '/groups';
    console.log("getAllGroups")
    return this.http.get(url);
  }

  getGroupsByUserId(id: any){
    let url = this.userProfileBaseUrl + '/groups';
    console.log(url + "/" + id);
    return this.http.get(url + "/" + id);
  }

  addUserToGroupByEmail(email: any, groupId: number){
    let formData = {
      "adminUserId": localStorage.getItem('id'),
      "email": email,
      "groupId": groupId,
      "role": 0
    }
    let url = this.groupConfigBaseUrl + '/add-user';
    return this.http.post(url, formData);
  }

  removeUserOffGroupById(userId: any, groupId: number){
    let formData = {
      "adminId": parseInt(localStorage.getItem('id') || "0"),
      "userId": userId,
      "groupId": groupId
    }
    console.log(formData);
    let url = this.groupConfigBaseUrl + '/remove-user';
    return this.http.post(url, formData);
  }

  setUserAdmin(userId: any, groupId: number){
    let formData = {
      "adminId": parseInt(localStorage.getItem('id') || "0"),
      "userId": userId,
      "groupId": groupId
    }
    console.log(formData);
    let url = this.groupConfigBaseUrl + '/set-admin';
    return this.http.post(url, formData);
  }

  getGroupbyId(groupId: number) {
    let url = this.groupBaseUrl + '/group/';
    return this.http.get(url + groupId);
  }

}
