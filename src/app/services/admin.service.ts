import { Injectable } from '@angular/core';  
import {HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { UserDetail} from '../classes/user-detail';  
import { Router } from '@angular/router';  
import { environment } from 'src/environments/environment';


import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Base URL  
  private  baseUrl = environment.apiURL;  

    constructor(private http: HttpClient, private router : Router) { }  
  
    saveUserDetails(userDetail: UserDetail) : Observable<any>  
    {  
        let url = this.baseUrl + "user/create";  
        return this.http.post(url,userDetail);  
    }  
    
    login(userDetail: UserDetail) : Observable<any>  
    {  
        let url = this.baseUrl + "authenticate";  
        return this.http.post(url, userDetail);  
    }  
    
    logout()   
    {   
      console.log("Logout")
      // Remove the token from the localStorage.  
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('username');
    
      this.router.navigate(['']);  
    
    }  
    
    /* 
    * Check whether User is loggedIn or not. 
    */  

    getToken(){
      let token = localStorage.getItem('token');  
      if (token) {
        return token;
      }else{
        return "";
      }
    }
    
    isLoggedIn() {   
    
      // create an instance of JwtHelper class.  
      let jwtHelper = new JwtHelperService();  
    
      // get the token from the localStorage as we have to work on this token.  
      let token = localStorage.getItem('token');  
    
      //console.log(token)
      // check whether if token have something or it is null.  
      if(!token)  
      {  
        return false;  
      }  
    
      // get the Expiration date of the token by calling getTokenExpirationDate(String) method of JwtHelper class. this method accepts a string value which is nothing but a token.  
    
      if(token)  
      { 
        let expirationDate = jwtHelper.getTokenExpirationDate(token);  
        // check whether the token is expired or not by calling isTokenExpired() method of JwtHelper class.  
        let isExpired = jwtHelper.isTokenExpired(token);  
        return !isExpired;      
      }   

      return false;  
    }  
      
      
    getUserDetail(username:any) : Observable<any>  
    {  
  //       let url = this.baseUrl + "user/" + username;  
    
         // create an instance of Header object.  
  //       let headers = new Headers();  
    
        // get token from localStorage.  
  //       let token = localStorage.getItem('token');  
    
        // Append Authorization header.  
  //       headers.append('Authorization' , 'Bearer ' + token);  
    
        // create object of RequestOptions and include that in it.  
  //       let options = new RequestOptions( { headers : headers } );  
    
  //       return this.http.get(url);  

		return this.http.get(this.baseUrl + 'user/username/{username}?username=' + username);  
    }  
      
    token(){
      let token = localStorage.getItem('token');  
      if(token){
        console.log("Has Token");
        return token;
      }else{
        console.log("No Token");
        return "";
      }
      
    }
  }  