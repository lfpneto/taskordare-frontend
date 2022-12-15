import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faTrash, faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { GroupService } from '../services/group.service';
import { AdminService } from '../services/admin.service';
import { Router, NavigationEnd } from '@angular/router';
import { GroupDetail } from '../classes/group-detail';
import { UsergroupDetail } from '../classes/usergroup-detail';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { TaskDetail } from '../classes/task-detail';
import { TaskService } from '../services/task.service';



@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})



export class UserGroupsComponent implements OnInit {
  myObserver: any;
  faTrash = faTrash;
  faPlus = faPlus;
  faEllipsisV = faEllipsisV;

  divName = "nothing";

  groupsOfUser:any;
  membersOfGroup: any;
  tasksOfGroup: any;

  userId: any;

  
  public groupDetail = new GroupDetail();
  private usergroupDetail = new UsergroupDetail();
  private taskDetail = new TaskDetail();

  constructor(
    private adminService: AdminService,
    private groupService: GroupService,
    private router: Router,
    private sanitized: DomSanitizer,
    private toastr: ToastrService,
    private taskService: TaskService
    ) {
      /*this.myObserver =*/ this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) { 
          /* Your code goes here on every router change */
          if(ev.url == "/usergroups"){
            //console.log("onInit  User-groups - start");
            let result:any;

            this.userId = localStorage.getItem('id');
            this.groupService.getGroupsByUserId(this.userId).subscribe(
              (response) => {
                result = response;
                //console.log(result.data.Users);
                if (result.status == "OK") {
                  this.groupsOfUser = result.data.Users[0].userGroupInfoDTO; 
                  console.log(this.groupsOfUser)
                }
                if (result == -1) {
                  this.toastr.error('Something failed', 'Error');
                }
              },
              (error) => {
                console.log('Errors (CORS?) - ' + JSON.stringify(error));
              }
            );

            //console.log("onInit  User-groups - end");
          }
        }
      });
    }

  ngOnInit() {
    if (this.adminService.isLoggedIn()) {
      // this.router.navigate(['/usermain']);
    } else {
      this.router.navigate(['/login']);
    }
  }




  showGroupAndTasks(group: GroupDetail){
    this.divName = "membersTaks"
    //give selected group to the constructor
    //console.log(group.description)
    this.groupDetail = group;
    //list members
    this.groupService.getMembersOfGroup(group.groupId).subscribe(
      (response) => {
        let result : any;
        result =  response;
        //console.log(result);
        if(result.status == "OK"){
          this.membersOfGroup = result.data.Users;
          for (let index = 0; index < this.membersOfGroup.length; index++) {
            this.membersOfGroup[index].showOptions = false;
            index++;
          }
          console.log(this.membersOfGroup)
        }else{
          this.toastr.error('No valid members', 'Error');
        }
      },
      (error) => {
        console.log('Errors (CORS?) - ' + JSON.stringify(error));
      }
    );
    
    this.taskService.getAllTaskbyGroupId(group.groupId).subscribe(
      (response) => {
        let result : any;
        result =  response;
        if(result.status == "OK"){
          this.tasksOfGroup = result.data.tasks;
          console.log(this.tasksOfGroup)
        }else{
          this.toastr.error('No valid tasks', 'Error');
        }
      },
      (error) => {
        console.log('Errors (CORS?) - ' + JSON.stringify(error));
      }
    );

    //todo list tasks
    //todo onShowMembers only show the delete action if user is admin
  }

  createGroup(result:any){
    this.groupDetail.groupId = 0;
    this.groupDetail.groupName = result.name.value;
    this.groupDetail.description = result.description.value;
  
    this.groupService.createGroup(this.groupDetail).subscribe(
      (response) => {
        let result =  response;
        console.log(result)
        if (result.status == "OK") {
          //console.log("Group Created");
          this.toastr.success('Group Created', 'Success');
          this.divName = "nothing";
          window.location.reload();
          //todo: add user to the group who just got created
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

  joinGroup(result: any){
    console.log(result.groupname.value);

    this.groupService.getGroupInfo(result.groupname.value).subscribe(
      (response) => {
        let result =  response;
        console.log(result.data.Group.id);
        console.log(result.status);

        if(result.status == "OK"){
          this.usergroupDetail.groupId = result.data.Group.id;
          this.usergroupDetail.userId = Number(localStorage.getItem('id'));
          this.usergroupDetail.points = 0;
          this.usergroupDetail.permission = 0;

          console.log(this.usergroupDetail)
          this.groupService.joinGroup(this.usergroupDetail).subscribe(
            (response) => {
              let result =  response;
              console.log(result)

              if (result.status == "OK") {
                console.log("Group Joined")
                this.toastr.success('Group Joined', 'Success');
              }
              if (result == -1) {
                this.toastr.error('Something failed in joining', 'Error');
              }
            },
            (error) => {
              console.log('Errors (CORS?) - ' + JSON.stringify(error));
            }
          );
        }
        if (result == -1) {
          this.toastr.error('Error finding group id', 'Error');

        }
      },
      (error) => {
        console.log('Errors (CORS?) - ' + JSON.stringify(error));
      }
    );

  }

  addUserByEmail(userEmailForm :any) {
    this.groupService.addUserToGroupByEmail(userEmailForm.email.value, this.groupDetail.groupId).subscribe(
      (response) => {
        let result : any;
        result =  response;
        //console.log(result);
        if(result.status == "OK"){
          this.toastr.success('User with the email: ' + userEmailForm.email.value +' added to the group', 'Success');
          this.divName = "nothing";
        }else{
          this.toastr.info('Not a valid User', 'Inform');
        }
      },
      (error) => {
        console.log('Errors (CORS?) - ' + JSON.stringify(error));
      }
    );
  }

  removeMember(userId: any, groupId: any, userName: any){
    this.groupService.removeUserOffGroupById(userId, groupId).subscribe(
      (response) => {
        let result : any;
        result =  response;
        if(result.status == "OK"){
          this.toastr.info('Member ' + userName + ' Removed', 'Info');
          this.divName = "nothing";

        }else{
          this.toastr.error('You cant remove the creator of the group', 'Error');
        }
      },
      (error) => {
        console.log('Errors (CORS?) - ' + JSON.stringify(error));
      }
    );
  }

  showJoinGroup(){
    this.divName = "joinGroup"
  }
  showCreateGroup(){
    this.divName = "createGroup"
  }

}
