import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { DareDetail } from '../classes/dare-detail';
import { DareService } from '../services/dare.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-user-dares',
  templateUrl: './user-dares.component.html',
  styleUrls: ['./user-dares.component.scss'],
})
export class UserDaresComponent implements OnInit {
  faUpload = faUpload;
  htmlToAdd: any;
  isChecked: boolean = false;

  showUploadImg: boolean = false;

  //file uploader
  url: any;
  msg = '';

  private dareDetail = new DareDetail();

  constructor(private router: Router, private dareService: DareService) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        /* Your code goes here on every router change */
        if (ev.url == '/userdares') {
          let result: any;
          //todo: change to getUserDares according to token
          let userId = localStorage.getItem('id');
          this.dareService.getUserDares(userId).subscribe(
            (response) => {
              result = response;
              if (result.status == 'OK') {
                var i = 0;
                result.data.Users.forEach((element: { deadline: any }) => {
                  result.data.Users[i].daysleft = this.calculateDiff(
                    element.deadline
                  );
                  i = i + 1;
                });

                this.htmlToAdd = result.data.Users;
              }
              if (result == -1) {
                alert('error');
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
          alert('Updated');
        }
        if (result == -1) {
          alert('error');
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

  // selectFile(event: any, dare: DareDetail) {
  //     //Angular 11, for stricter type
  //     if (!event.target.files[0] || event.target.files[0].length == 0) {
  //       this.msg = 'You must select an image';
  //       return;
  //     }

  //     var mimeType = event.target.files[0].type;

  //     if (mimeType.match(/image\/*/) == null) {
  //       this.msg = 'Only images are supported';
  //       return;
  //     }

  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);

  //     reader.onload = (_event) => {
  //       this.msg = '';
  //       this.url = reader.result;
  //     };

  // 	//this.imageUpload(event.target.files[0].name, dare);
  // 	let result: any;
  // 	this.dareService.uploadImagePost(event.target.files[0].name).subscribe(
  // 		(response) => {
  // 		  result = response;
  // 		  console.log(result);
  // 		  if (result.status_code == 200) {

  // 		  } else {
  // 			alert('error');
  // 		  }
  // 		  if (result == -1) {
  // 			alert('error');
  // 		  }
  // 		},
  // 		(error) => {
  // 		  console.log('Errors (CORS?) - ' + JSON.stringify(error));
  // 		}
  // 	  );
  //   }

  // OnClick of button Upload
  onUpload(event: any, dare: DareDetail) {
    console.log(event);
    if (event.target.files[0]) {
      console.log('entrei');
      this.dareService.upload(event.target.files[0]).subscribe((event: any) => {
        console.log(event);
        if (typeof event === 'object') {
			dare.url = event.image.display_url;
			this.updateDareResponse(dare);
        }
      });
    }
  }
}
