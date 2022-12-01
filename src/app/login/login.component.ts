import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserDetail } from '../classes/user-detail';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import {MessageService} from 'primeng/api';
// import { PrimeNGConfig } from 'primeng/api';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']})


export class LoginComponent implements OnInit {

  private userDetail = new UserDetail();


  constructor(
    private adminService: AdminService, 
    private router: Router,
    private messageService: MessageService,
    // private primengConfig: PrimeNGConfig
    ) {}

  ngOnInit() {
    // this.primengConfig.ripple = true;

    if (this.adminService.isLoggedIn()) {
      this.router.navigate(['/usermain']);
    } else {
      this.router.navigate(['/login']);
    }
  }


  LoginForm(LoginInformation: any) {
    // console.log("You have entered : " + result.password);
    // result.userName = "username";
    // result.password = "password";

    console.log("message1");
        // this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
        console.log("message2");

    this.userDetail.userName = LoginInformation.username.value;
    this.userDetail.password = LoginInformation.password.value;

    this.adminService.login(this.userDetail).subscribe(
      (response) => {
        let result =  response;
        //console.log(result)

        

        if (result.token) {

          console.log("Token: " + result.token)
          //let token = response.headers.get('Authorization');
          let token = result.token;
          //let token = "teste123";
          localStorage.setItem('token', token); //need to talk to luis to rewrite this
          localStorage.setItem('username', this.userDetail.userName)

          // this.appComponent.setUserNameText(this.userDetail.userName);


            this.adminService.getUserDetail(this.userDetail.userName).subscribe(
              (response) => {
                let result = response;
                console.log(result);

                this.messageService.add({severity:'info', summary: '', detail: 'Logged In', life:2000});

                localStorage.setItem('id', result.data.User.id); //same here
                this.router.navigate(['/usermain', result]);

              },
              (error) => {
                console.log('error while getting Admin Data');
              }
            );
        }
        if (result == -1) {
          alert(
            'please register before login Or Invalid combination of Email and password'
          );
        }
      },
      (error) => {
        console.log('Error in authentication');
      }
    );

    //let response =  this.http.post("http://localhost:8080/user/search-user", bodyBuilder);
    //response.subscribe(data=>{console.log(data)});

    // this.http.request('http://localhost:8080/user/search-user', bodyBuilder)
    // .subscribe(response => console.log(response.text()))

    // if (response.subscribe. == "User Not Found"){
    //   this.userValidationError = true;
    // }
  }
}
