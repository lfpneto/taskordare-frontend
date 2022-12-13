import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = environment.apiURL + 'tasks';

  constructor(private http: HttpClient) { }
  
}
