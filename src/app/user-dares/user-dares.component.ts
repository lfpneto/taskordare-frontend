import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { DareDetail } from '../classes/dare-detail';
import { DareService } from '../services/dare.service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-dares',
  templateUrl: './user-dares.component.html',
  styleUrls: ['./user-dares.component.scss'],
})
export class UserDaresComponent implements OnInit {
  faUpload = faUpload;
  daresChallenged: any;
  daresChallenger: any;

  isChecked: boolean = false;

  showUploadImg: boolean = false;

  //file uploader
  url: any;
  msg = '';

  private dareDetail = new DareDetail();

  constructor(
    private router: Router,
    private dareService: DareService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        /* Your code goes here on every router change */
        if (ev.url == '/userdares') {
          let result: any;
          let resultUser: any;
          let userId = localStorage.getItem('id');
          this.dareService.getUserChallengedDares(userId).subscribe(
            (response) => {
              result = response;
              if (result.status == 'OK') {
                var i = 0;
                result.data.Challenged.forEach(
                  (element: { deadline: any; ownerId: any }) => {
                    //turns data into deadline days left
                    result.data.Challenged[i].daysleft = this.calculateDiff(
                      element.deadline
                    );

                    result.data.Challenged[i].showOptions = false;

                    i = i + 1;
                  }
                );

                this.daresChallenged = result.data.Challenged;

                console.log('start of the loop');
                for (let index = 0; index < this.daresChallenged.length; index++) {
                  const element = this.daresChallenged[index];
                  console.log(index);
                  //gets the info data by his id
                  this.adminService
                    .getUserDetailById(element.challengerId)
                    .subscribe(
                      (response2) => {
                        console.log(result);
                        resultUser = response2;
                        if (resultUser.status == 'OK') {
                          this.daresChallenged[index].challengerName =
                            resultUser.data.User.userName;
                        }
                        if (resultUser == -1) {
                          this.toastr.error('Something failed', 'Error');
                        }
                      },
                      (error) => {
                        console.log(
                          'Errors (CORS?) - ' + JSON.stringify(error)
                        );
                      }
                    );
                }
              }
              if (result == -1) {
                this.toastr.error('Something failed', 'Error');
              }
            },
            (error) => {
              console.log('Errors (CORS?) - ' + JSON.stringify(error));
            }
          );

          this.dareService.getUserChallengerDares(userId).subscribe(
            (response) => {
              result = response;
              if (result.status == 'OK') {
                var i = 0;
                result.data.Challenger.forEach(
                  (element: { deadline: any; ownerId: any }) => {
                    //turns data into deadline days left
                    result.data.Challenger[i].daysleft = this.calculateDiff(
                      element.deadline
                    );
                    i = i + 1;
                  }
                );

                this.daresChallenger = result.data.Challenger;

                console.log('start of the loop');
                for (let index = 0; index < this.daresChallenger.length; index++) {
                  const element = this.daresChallenger[index];
                  console.log(index);
                  //gets the info data by his id
                  this.adminService
                    .getUserDetailById(element.challengedId)
                    .subscribe(
                      (response2) => {
                        console.log(result);
                        resultUser = response2;
                        if (resultUser.status == 'OK') {
                          this.daresChallenger[index].challengerName =
                            resultUser.data.User.userName;
                        }
                        if (resultUser == -1) {
                          this.toastr.error('Something failed', 'Error');
                        }
                      },
                      (error) => {
                        console.log(
                          'Errors (CORS?) - ' + JSON.stringify(error)
                        );
                      }
                    );
                }
              }
              if (result == -1) {
                this.toastr.error('Something failed', 'Error');
              }
            },
            (error) => {
              console.log('Errors (CORS?) - ' + JSON.stringify(error));
            }
          );

          console.log('onInit  User-groups - end');
        }
      }
    });
  }

  ngOnInit(): void {}

  showDareInfo(dareId: number) {}

  changeStatusChecked(dare: DareDetail) {
    if (dare.url != '') {
      if (dare.status == 1) {
        dare.status = 0;
      } else {
        dare.status = 1;
      }
      this.updateDareResponse(dare);
    }
  }

  updateDareResponse(dare: DareDetail) {
    let result: any;
    this.dareService.updateDare(dare).subscribe(
      (response) => {
        result = response;
        if (result.status == 'OK') {
          this.toastr.success('Status updated', 'Success');
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
  onUpload(event: any, dare: DareDetail) {
    console.log(event);
    if (event.target.files[0]) {
      console.log('entrei');
      this.dareService.upload(event.target.files[0]).subscribe((event: any) => {
        console.log(event);
        if (typeof event === 'object') {
          dare.url = event.image.display_url;
          //this.updateDareResponse(dare);
          this.changeStatusChecked(dare);
        }
      });
    }
  }
}
