import { Component, OnInit } from '@angular/core';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss']
})
export class UserGroupsComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;

  constructor() { }

  ngOnInit(): void {
  }

  addDare(value:any){

  }

}
