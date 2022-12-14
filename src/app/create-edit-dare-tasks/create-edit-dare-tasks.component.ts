import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-dare-tasks',
  templateUrl: './create-edit-dare-tasks.component.html',
  styleUrls: ['./create-edit-dare-tasks.component.scss']
})
export class CreateEditDareTasksComponent implements OnInit {

  points:number = 0;

  taskOrDare = "none";

  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        if(ev.url == "/createeditdaretasks?taskOrDare=task"){
          this.taskOrDare = "task";
        }else if(ev.url == "/createeditdaretasks?taskOrDare=dare"){
          this.taskOrDare = "dare";
        }
      }
    });
  }

  ngOnInit(): void {
  }

  addDareOrTask(value:any){
    
  }

}
