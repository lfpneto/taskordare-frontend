import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { NavigationEnd, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { GroupService } from '../services/group.service';
import { TaskDetail } from '../classes/task-detail';
import { DareService } from '../services/dare.service';


@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss']
})
export class UserTasksComponent implements OnInit {
  allGroupsAndTasks: any;
  allTasksInGroups = [{
    id: 0,
    ownerId: 0,
    groupId: 0,
    groupName: "",
    taskName: "",
    description: "",
    points: 0,
    deadline: "",
    status: 0,
    url: "",
    //extra
    timeLeft: "",
    showOptions: false
  }];
  

  faUpload = faUpload;

  constructor(
    private router: Router,
    private taskService: TaskService,
    private groupService: GroupService,
    private dareService: DareService,
    private toastr: ToastrService,
    ) { 
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        /* Your code goes here on every router change */
        if (ev.url == '/usertasks') {
          let result: any;
          let resultGroup: any;
          let userId = Number(localStorage.getItem('id') || 0);
          this.taskService.getAllTaskbyUserId(userId).subscribe(
            (response) => {
              result = response;
              console.log(result)
              if (result.status == 'OK') {
                // var i = 0;
                // result.data.Tasks.forEach(
                //   (element: { deadline: any}) => {
                //     //turns data into deadline days left
                //     console.log(element.deadline)
                //     result.data.Tasks[i].daysleft = this.calculateDiff(
                //       element.deadline
                //     );

                //     result.data.Tasks[i].showOptions = false;

                //     i = i + 1;
                //   }
                // );

                this.allGroupsAndTasks = result.data.Tasks;
                
                // allTasksInGroups = [{
                //   ownerId: 0,
                //   groupId: 0,
                //   groupName: "",
                //   taskName: "",
                //   description: "",
                //   points: 0,
                //   deadline: "",
                //   status: 0,
                //   url: "",
                //   //extra
                //   timeLeft: "",
                //   showOptions: false
                // }];
                
                console.log(this.allGroupsAndTasks);

                for (let index = 0; index < this.allGroupsAndTasks.length; index++) {
                  for (let index2 = 0; index2 < this.allGroupsAndTasks[index].tasks.length; index2++) {
                    // console.log(index);
                    // console.log(index2);
                    // console.log(i);
                    // console.log(this.allGroupsAndTasks[index].group)
                    // console.log(this.allGroupsAndTasks[index].tasks)
                    // console.log(this.allGroupsAndTasks[index].group.groupName)

                    this.allTasksInGroups.push({
                      id: this.allGroupsAndTasks[index].tasks[index2].id,
                      ownerId: this.allGroupsAndTasks[index].tasks[index2].ownerId,
                      groupId: this.allGroupsAndTasks[index].group.id,
                      groupName: this.allGroupsAndTasks[index].group.groupName,
                      taskName: this.allGroupsAndTasks[index].tasks[index2].taskName,
                      description: this.allGroupsAndTasks[index].tasks[index2].description,
                      points: this.allGroupsAndTasks[index].tasks[index2].points,
                      deadline: this.allGroupsAndTasks[index].tasks[index2].deadline,
                      status: this.allGroupsAndTasks[index].tasks[index2].status,
                      url: this.allGroupsAndTasks[index].tasks[index2].url,
                      //extra
                      timeLeft: this.calculateDiff(this.allGroupsAndTasks[index].tasks[index2].deadline),
                      showOptions: false
                    });
                    
                    /* this.allTasksInGroups[i].groupName = this.allGroupsAndTasks[index].group.groupName;
                    
                    this.allTasksInGroups[i].name = this.allGroupsAndTasks[index].tasks[index2].taskName;
                    this.allTasksInGroups[i].description = this.allGroupsAndTasks[index].tasks[index2].description;
                    this.allTasksInGroups[i].deadline = this.allGroupsAndTasks[index].tasks[index2].deadline;
                    this.allTasksInGroups[i].points = this.allGroupsAndTasks[index].tasks[index2].points;
                    this.allTasksInGroups[i].image = this.allGroupsAndTasks[index].tasks[index2].url;
                    this.allTasksInGroups[i].status = this.allGroupsAndTasks[index].tasks[index2].status; */

                  }
                }

                this.allTasksInGroups.shift();
                console.log(this.allTasksInGroups)
                

                // console.log('start of the loop');
                // for (let index = 0; index < this.allGroupsAndTasks.length; index++) {
                //   const element = this.allGroupsAndTasks[index];
                //   console.log(index);
                //   //gets the info data by his id
                //   this.groupService
                //     .getGroupbyId(element.groupId)
                //     .subscribe(
                //       (response2) => {
                //         console.log(result);
                //         resultGroup = response2;
                //         if (resultGroup.status == 'OK') {
                //           this.allGroupsAndTasks[index].groupName =
                //             resultGroup.data.Group.groupName;
                //         }
                //         if (resultGroup == -1) {
                //           this.toastr.error('Something failed', 'Error');
                //         }
                //       },
                //       (error) => {
                //         console.log(
                //           'Errors (CORS?) - ' + JSON.stringify(error)
                //         );
                //       }
                //     );
                // }
                
              }
              if (result == -1) {
                this.toastr.error('Something failed', 'Error');
              }
            },
            (error) => {
              console.log('Errors (CORS?) - ' + JSON.stringify(error));
            }
          );
        }
      }
    });
  }

  ngOnInit(): void {
  }

  calculateDiff(dateSent: any) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    var difference = Math.floor(
      (Date.UTC(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ) -
        Date.UTC(
          dateSent.getFullYear(),
          dateSent.getMonth(),
          dateSent.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    );
    // return -difference;
    if (difference > 0) {
      return 'Days overdue: ' + -difference;
    } else {
      return 'Days left: ' + -difference;
    }
  }

  // OnClick of button Upload
  onUpload(event: any, task: any) {
    console.log(event);
    if (event.target.files[0]) {
      console.log('entrei');
      this.dareService.upload(event.target.files[0]).subscribe((event: any) => {
        console.log(event);
        if (typeof event === 'object') {
          task.url = event.image.display_url;
          //this.updateDareResponse(dare);
          this.changeStatusChecked(task);
        }
      });
    }
  }

  changeStatusChecked(task: TaskDetail) {
    if (task.url != '') {
      if (task.status == 1) {
        task.status = 0;
      } else {
        task.status = 1;
      }
      this.updateDareResponse(task);
    }
  }

  updateDareResponse(task: TaskDetail) {
    let result: any;
    this.taskService.updateTask(task).subscribe(
      (response) => {
        result = response;
        if (result.status == 'OK') {
          this.toastr.success('Status updated', 'Success');
        }else if (result == -1){
          this.toastr.error('Something failed', 'Error');
        }
        else{
          this.toastr.error('Something failed', 'Error');
        }

        
      },
      (error) => {
        console.log('Errors (CORS?) - ' + JSON.stringify(error));
      }
    );
  }

}
