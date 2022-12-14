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
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class DareService {
  private baseUrl = environment.apiURL + 'dares';
  private baseUserProfileUrl = environment.apiURL + 'user-profile';

  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) {}

  //POST METHODS
  createDare(dareDetail: DareDetail) {
    console.log('createDare');
    let url = this.baseUrl + '/create';
    return this.http.post(url, dareDetail);
  }

  updateDare(dareDetail: DareDetail) {
    //console.log("updateDare");
    let url = this.baseUrl + '/update';
    console.log(url);
    return this.http.post(url, dareDetail);
  }

  deleteDare(dareId: number) {
    console.log('deleteDare');
    let url = this.baseUrl + '/delete';
    return this.http.post(url, dareId);
  }

  //GET METHODS
  getAllDares() {
    let url = this.baseUrl + '/dares';
    console.log('getAllDares');
    return this.http.get(url);
  }

  getDareInformation(dareId: number) {
    let url = this.baseUrl + '/dare/';
    console.log('getDareInformation');
    return this.http.get(url + dareId);
  }

  getUserDares(userId: any) {
    let url = this.baseUserProfileUrl + '/dares';
    //console.log("getUserDares")
    return this.http.get(url + '/' + userId);
  }

  upload(file: any): Observable<any> {
    const formData = new FormData(); // Store form name as "file" with file data
    formData.append('source', file, file.name); // Make http post request over api // with formData as req
    console.log(formData);
    //return this.http.post(this.imageAPIUploader, formData)
    let imageAPIUploader ='https://freeimage.host/api';

    return this.http.post(imageAPIUploader + "/1/upload?key=6d207e02198a847aa98d0a2a901485a5", formData)
  }
}
