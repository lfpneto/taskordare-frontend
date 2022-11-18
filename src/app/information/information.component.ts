import { Component, OnInit } from '@angular/core';
import { faPlay, faUser} from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  faPlay = faPlay;
  faUser = faUser;

  // constructor(private http:HttpClient) { }

  ngOnInit(): void {
    // let response =  this.http.get("http://localhost:8080/user/users");
    // response.subscribe((data)=>console.log(data));
  }

}
