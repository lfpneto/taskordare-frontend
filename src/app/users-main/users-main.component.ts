import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users-main',
  templateUrl: './users-main.component.html',
  styleUrls: ['./users-main.component.scss'],
})


export class UsersMainComponent implements OnInit {


  private userName: any;
  private haveData = 0;
  private data = [];
  private dataRequest = false;


  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    // if (this.adminService.isLoggedIn()) {
    //   this.route.paramMap.subscribe((params) => {
    //     console.log(params.get("userName"));
    //     this.userName = params.get('userName');
    //   });
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }


  getUserData() {

    this.haveData = 0;
    this.dataRequest = true;
    this.adminService.getUserDetail(this.userName).subscribe(
      (response) => {
        let result = response;
        console.log(result);

        this.data = result;
        if (result == ' ') {
          this.haveData = 0;
        } else {
          this.haveData = this.haveData + 1;
        }
      },
      (error) => {
        console.log('error while getting Admin Data');
      }
    );
  }
}
