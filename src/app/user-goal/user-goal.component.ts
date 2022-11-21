import { Component, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-goal',
  templateUrl: './user-goal.component.html',
  styleUrls: ['./user-goal.component.scss']
})
export class UserGoalComponent implements OnInit {
  faUpload = faUpload;

  constructor() { }

  ngOnInit(): void {
  }

}
