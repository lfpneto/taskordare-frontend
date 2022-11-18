import { Component } from '@angular/core';
import { Observable } from 'rxjs';  
import { AdminService } from './services/admin.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  
  userNameLabel:any;

  isLoggedIn = false;
  loginPage = false;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    console.log("ngOnInit do appComponent")
    // console.log(localStorage.getItem('username'))
    

  }

  mainClick(){
    this.loginPage = false;
    console.log("mainClick");
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
    console.log("changeLoggedStatus");
    console.log(this.isLoggedIn);
    this.isLoggedIn = !this.isLoggedIn;
    console.log(this.isLoggedIn);
    

    this.userNameLabel = "";
    
  }

  inLoginPage(){
    this.loginPage = true;
    console.log(this.loginPage)
  }

  // setUserNameText(userDetail:string){
  //   console.log("setUserNameText")
  //     this.userNameLabel = "Hey, " + userDetail;
  // }

  
}
