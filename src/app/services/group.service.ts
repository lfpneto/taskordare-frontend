import { Injectable } from '@angular/core';  
import {HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { UserDetail} from '../classes/user-detail';  
import { UsergroupDetail } from '../classes/usergroup-detail';
import { Router } from '@angular/router';  
import { GroupDetail } from '../classes/group-detail';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupBaseUrl = "http://localhost:8080/group";  
  private userGroupBaseUrl = "http://localhost:8080/user-group"

  constructor(private http: HttpClient, private router : Router) { }  

  createGroup(groupDetail: GroupDetail) : Observable<any>  
  {  
		console.log(groupDetail);
		let url = this.groupBaseUrl + "/create";  
    return this.http.post(url,groupDetail);  

    // TODO: this under - Authetication Bearer via Token
    // let url = this.groupBaseUrl + "/create";  
  	// 	return this.http.get(url,{
		// 	headers: {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE2NjkzNzMwMTUsImV4cCI6MTY2OTM5MTAxNX0.mnFwXzRUMTbmYU0xfRn78xgVDQtFJtEbty5-oPukUHQ"},
		// 	params: groupDetail
		// });  
  }  

  getGroupInfo(groupName: any) : Observable<any>  
  {  
		console.log(groupName);

    // let groupInfo = this.http.get('http://localhost:8080/group/group-name/{groupName}?groupName=' + groupName);

    return this.http.get('http://localhost:8080/group/group-name/{groupName}?groupName=' + groupName);  

    // TODO: this under - Authetication Bearer via Token
    // let url = this.groupBaseUrl + "/create";  
  	// 	return this.http.get(url,{
		// 	headers: {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE2NjkzNzMwMTUsImV4cCI6MTY2OTM5MTAxNX0.mnFwXzRUMTbmYU0xfRn78xgVDQtFJtEbty5-oPukUHQ"},
		// 	params: groupDetail
		// });  
  } 
  joinGroup(usergroupDetail: UsergroupDetail) : Observable<any>  
  {  
		console.log(usergroupDetail);

		let url = this.userGroupBaseUrl + "/update";  
    return this.http.post(url,usergroupDetail);  

    // TODO: this under - Authetication Bearer via Token
    // let url = this.groupBaseUrl + "/create";  
  	// 	return this.http.get(url,{
		// 	headers: {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE2NjkzNzMwMTUsImV4cCI6MTY2OTM5MTAxNX0.mnFwXzRUMTbmYU0xfRn78xgVDQtFJtEbty5-oPukUHQ"},
		// 	params: groupDetail
		// });  
  }
  
}
