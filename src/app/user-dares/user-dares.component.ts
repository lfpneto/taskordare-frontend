import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-dares',
  templateUrl: './user-dares.component.html',
  styleUrls: ['./user-dares.component.scss']
})
export class UserDaresComponent implements OnInit {
  faUpload = faUpload;

  
  constructor() { }

  ngOnInit(): void {
  }

}
