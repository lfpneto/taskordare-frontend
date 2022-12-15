import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaskDetail } from '../classes/task-detail';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = environment.apiURL + 'tasks';
  private baseGroupConfigUrl = environment.apiURL + 'group-config';


  constructor(private http: HttpClient) { }

    //POST METHODS
    createTask(TaskDetail: TaskDetail) {
      console.log('createTask');
      let url = this.baseUrl + '/create';
      return this.http.post(url, TaskDetail);
    }
  
    updateTask(TaskDetail: TaskDetail) {
      //console.log("updateTask");
      let url = this.baseUrl + '/update';
      console.log(url);
      return this.http.post(url, TaskDetail);
    }
  
    deleteTask(TaskId: number) {
      console.log('deleteTask');
      let url = this.baseUrl + '/delete';
      return this.http.post(url, TaskId);
    }
  
    //GET METHODS
    getAllTasks() {
      let url = this.baseUrl + '/Tasks';
      console.log('getAllTasks');
      return this.http.get(url);
    }
  
    getTaskbyId(TaskId: number) {
      let url = this.baseUrl + '/Task/';
      return this.http.get(url + TaskId);
    }
  
    getUserTasks(userId: any) {
      let url = this.baseUrl + '/Task/';
      return this.http.get(url + '/' + userId);
    }

    getAllTaskbyGroupId(groupId: number) {
      let url = this.baseGroupConfigUrl + '/get-group-tasks/';
      return this.http.get(url + groupId);
    }
  
}
