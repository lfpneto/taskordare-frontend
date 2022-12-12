import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DareDetail } from '../classes/dare-detail';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DareService {
  private baseUrl = environment.apiURL + 'dares';


  constructor(private http: HttpClient) {}

  //POST METHODS
  createDare(dareDetail: DareDetail){
    console.log("createDare");
    let url = this.baseUrl + '/create';
    return this.http.post(url, dareDetail);
  }

  updateDare(dareDetail: DareDetail){
    console.log("updateDare");
    let url = this.baseUrl + '/update';
    return this.http.post(url, dareDetail);
  }

  deleteDare(dareId: number){
    console.log("deleteDare");
    let url = this.baseUrl + '/delete';
    return this.http.post(url, dareId);
  }

  //GET METHODS
  getAllDares(){
    let url = this.baseUrl + '/dares';
    console.log("getAllDares")
    return this.http.get(url);
  }

  getDareInformation(dareId: number){
    let url = this.baseUrl + '/dare/';
    console.log("getDareInformation")
    return this.http.get(url + dareId);
  }

  getUserDares(userName: any){
    let url = this.baseUrl + '/endpointName?';
    console.log("getUserDares")
    return this.http.get(url + '{userName}?userName=' + userName);
  }




}
