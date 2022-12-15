import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { UserDetail } from '../classes/user-detail';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})


export class RegisterComponent implements OnInit {

  private userDetail = new UserDetail();  

  constructor(
    private adminService: AdminService, 
    private router: Router, 
    private toastr: ToastrService
    ) {}


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
      this.toastr.info('Fields empty', 'Alert');
		  return;  
	  }

	var a = false;
	for (let i = 0; i < this.userDetail.email.length; i++) {
		if(this.userDetail.email[i] == "@"){
			a = true
		}
	}

	if(a == false){
    this.toastr.info('Please insert a valid email', 'Alert');
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
                this.toastr.error('Error occur while registring user. Problem with API result.', 'Error'); 
              }  
          },  
          error => {  
            this.toastr.error('Error occur while registring User. API response problem.', 'Error');   
          }  
        );  
          
     }  
     else  
     {  
        this.toastr.info('Passwords do not match', 'Alert');
        return;
     }  
  }  
  
}
