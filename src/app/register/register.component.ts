import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { UserDetail } from '../classes/user-detail';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})


export class RegisterComponent implements OnInit {

  private userDetail = new UserDetail();  

  constructor(private adminService: AdminService, private router: Router) {}


  ngOnInit(): void {} // create the form object.


  AdminForm(AdminInformation: any)  
  {  
    this.userDetail.firstName= AdminInformation.firstName.value;
    this.userDetail.lastName = AdminInformation.lastName.value;
    this.userDetail.points = 0;
    this.userDetail.userName = AdminInformation.username.value;
    this.userDetail.email = AdminInformation.email.value;
    this.userDetail.password = AdminInformation.password.value; 

  	if(this.userDetail.firstName == "" || this.userDetail.lastName == "" || this.userDetail.userName == "" || this.userDetail.email == "" || this.userDetail.password == ""){
		alert("Fields empty.")
		return;  
	}

	var a = false;
	for (let i = 0; i < this.userDetail.email.length; i++) {
		if(this.userDetail.email[i] == "@"){
			a = true
		}
	}

	if(a == false){
		alert("Please insert valid email.")
		return;  
	}


     if(this.userDetail.password ==  AdminInformation.passwordConfirmation.value)  
     {    
        this.adminService.saveUserDetails(this.userDetail).subscribe(  
          response => {  
              let result = response.status;  
              console.log("result")
              console.log(result)
  
              if(result == "CREATED")  
              {  
                this.router.navigate(['/login']);  
              }  
              else  
              {  
                  alert("Error occur while registring user. Problem with API result.")  
              }  
          },  
          error => {  
            alert("Error occur while registring User. API response problem.")  
          }  
        );  
          
     }  
     else  
     {  
        alert("Passwords do not match.");
		return;
     }  
  }  
  
}
