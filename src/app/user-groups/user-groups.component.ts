import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faTrash, faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { GroupService } from '../services/group.service';
import { AdminService } from '../services/admin.service';
import { Router, NavigationEnd } from '@angular/router';
import { GroupDetail } from '../classes/group-detail';
import { UsergroupDetail } from '../classes/usergroup-detail';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})



export class UserGroupsComponent implements OnInit, OnDestroy {
  myObserver: any;
  faTrash = faTrash;
  faPlus = faPlus;
  faEllipsisV = faEllipsisV;

  divName = "nothing";

  groupsOfUser:any;
  membersOfGroup: any;

  
  public groupDetail = new GroupDetail();
  private usergroupDetail = new UsergroupDetail();

  constructor(
    private adminService: AdminService,
    private groupService: GroupService,
    private router: Router,
    private sanitized: DomSanitizer,
    private toastr: ToastrService
    ) {
      /*this.myObserver =*/ this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) { 
          /* Your code goes here on every router change */
          if(ev.url == "/usergroups"){
            //console.log("onInit  User-groups - start");
            let result:any;

            let userId = localStorage.getItem('id');
            //todo: change to getUseGroup according to token
            this.groupService.getGroupsByUserId(userId).subscribe(
              (response) => {
                result = response;
                //console.log(result.data.Users);
                if (result.status == "OK") {
                  this.groupsOfUser = result.data.Users[0].userGroupInfoDTO;  
                }
                if (result == -1) {
                  alert(
                    'error'
                  );
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

  ngOnDestroy() {
    console.log("destroyed");
    // this.myObserver.unsubscribe();
  }


  addDare(value:any){

  }

  showJoinGroup(){
    this.divName = "joinGroup"
  }
  showCreateGroup(){
    this.divName = "createGroup"
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
          alert("Not valid members.")
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
          alert("Group Created");
          this.divName = "nothing";
          window.location.reload();
          //todo: add user to the group who just got created
        }
        if (result == -1) {
          alert(
            'please register before login Or Invalid combination of Email and password'
          );
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
                alert("Group Joined")
              }
              if (result == -1) {
                alert(
                  'error in joining'
                );
              }
            },
            (error) => {
              console.log('Errors (CORS?) - ' + JSON.stringify(error));
            }
          );
        }
        if (result == -1) {
          alert(
            'error in finding group id'
          );
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
          alert("User added to the group");
          window.location.reload();
        }else{
          alert("Not a valid User.")
        }
      },
      (error) => {
        console.log('Errors (CORS?) - ' + JSON.stringify(error));
      }
    );
  }

  removeMember(userId: any, groupId: any){
    this.toastr.success('Hello world!', 'Toastr fun!');
    // this.groupService.removeUserOffGroupById(userId, groupId).subscribe(
    //   (response) => {
    //     let result : any;
    //     result =  response;
    //     if(result.status == "OK"){
    //       alert("User removed from the group");
    //       window.location.reload();
    //     }else{
    //       alert("User not removed;")
    //     }
    //   },
    //   (error) => {
    //     console.log('Errors (CORS?) - ' + JSON.stringify(error));
    //   }
    // );
  }

}
