import { Component } from '@angular/core';
import { Observable } from 'rxjs';  
import { AdminService } from './services/admin.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})


export class AppComponent {
  title = 'angular';
  
  userNameLabel:any;

  isLoggedIn = false;
  loginPage = false;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private messageService: MessageService, 
    ) {
      this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) { 
          /* Your code goes here on every router change */
          if(ev.url == "/usermain"){
            this.mainClick();
          }
        }
      });


    }

  ngOnInit() {

    //console.log("ngOnInit do appComponent");

    // console.log(localStorage.getItem('username'))
    

  }

  mainClick(){
    this.loginPage = false;
    this.isLoggedIn = this.adminService.isLoggedIn();
    if (this.isLoggedIn){
      if (localStorage.getItem('username') != null) {
        this.userNameLabel = "Hey, " + localStorage.getItem('username') + "";
      }else{
        this.userNameLabel = "";
      }
    }
  }

  changeLoggedStatus(){
    this.isLoggedIn = !this.isLoggedIn;
    this.userNameLabel = "";
  }

  inLoginPage(){
    this.loginPage = true;
    //console.log(this.loginPage)
  }

  // setUserNameText(userDetail:string){
  //   console.log("setUserNameText")
  //     this.userNameLabel = "Hey, " + userDetail;
  // }

  
}
