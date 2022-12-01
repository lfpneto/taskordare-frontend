import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { DareDetail } from '../classes/dare-detail';
import { DareService } from '../services/dare.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-user-dares',
  templateUrl: './user-dares.component.html',
  styleUrls: ['./user-dares.component.scss']
})
export class UserDaresComponent implements OnInit {
  faUpload = faUpload;
  htmlToAdd: any;

  private dareDetail = new DareDetail();

  constructor(
    private router: Router,
    private dareService: DareService,
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        /* Your code goes here on every router change */
        if(ev.url == "/userdares"){
          let result:any;
          //todo: change to getUserDares according to token
          this.dareService.getAllDares().subscribe(
            (response) => {
              result = response;
              if (result.status == "OK") {
                var i = 0;
                result.data.Dares.forEach((element: { deadline: any; }) => {
                  result.data.Dares[i].daysleft = this.calculateDiff(element.deadline);
                  i = i + 1;
                });

                this.htmlToAdd = result.data.Dares;
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

          console.log("onInit  User-groups - end");
        }
      }
    });

  }

  ngOnInit(): void {
  }

  showDareInfo(dareId: number){

  }

  calculateDiff(dateSent: any){
    let currentDate = new Date();
    dateSent = new Date(dateSent);
    var difference = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) /(1000 * 60 * 60 * 24));
    // return -difference;
    if(difference > 0){
      return "Days overdue: " + -difference;
    }else{
      return "Days left: " + -difference;
    }
}

  

}
