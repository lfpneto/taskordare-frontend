import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DareDetail } from '../classes/dare-detail';
import { TaskDetail } from '../classes/task-detail';
import { DareService } from '../services/dare.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-create-edit-dare-tasks',
  templateUrl: './create-edit-dare-tasks.component.html',
  styleUrls: ['./create-edit-dare-tasks.component.scss'],
})
export class CreateEditDareTasksComponent implements OnInit {
  points: number = 0;

  buttonsShow = true;

  taskOrDare = 'none';
  groupChallengedId = 0;
  groupChallengedName = "";
  groupChallengerPoints = 0;
  
  userChallengedId = 0;
  userChallengedName = "";

  public taskDetail = new TaskDetail();
  public dareDetail = new DareDetail();

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private dareService: DareService,
    private toastr: ToastrService
    ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.taskOrDare = params['taskOrDare'];
      if (this.taskOrDare == "task"){
        this.groupChallengedId = params['groupChallengedId'];
        this.groupChallengedName = params['groupChallengedName'];
        this.groupChallengerPoints = params['groupChallengerPoints'];

      }else if (this.taskOrDare == "dare"){
        this.userChallengedId = params['userChallengedId'];
        this.userChallengedName = params['userChallengedName'];

      }
    });
  }

  ngOnInit(): void {}

  addDare(result: any) {
    console.log(result);
    let field = this.isAnyFieldInTheFormEmpty(result);
    if (field != ""){
      this.toastr.info('Fields' + field + 'empty', 'Inform');
      this.buttonsShow = true;
      return;
    }

    this.buttonsShow = false;

    this.dareDetail.id = 0;
    this.dareDetail.dareName = result.name.value;
    this.dareDetail.description = result.description.value;
    this.dareDetail.reward = result.reward.value;
    this.dareDetail.ownerId = this.userChallengedId;
    this.dareDetail.deadline = result.date.value;
    this.dareDetail.status = 1;
    this.dareDetail.url = "";

  
    this.dareService.createDare(this.dareDetail).subscribe(
      (response) => {
        let result: any;
        result =  response
        console.log(result)
        if (result.status == "CREATED") {
          this.toastr.success('Dare Created', 'Success');
          this.router.navigate(['/usergroups']);
        }
        if (result == -1) {
          this.toastr.error('Something failed', 'Error');
        }
      },
      (error) => {
        console.log('Errors (CORS?) - ' + JSON.stringify(error));
      }
    );

    this.buttonsShow = true;

  }

  addTask(result: any) {
    this.buttonsShow = false;
    
    let field = this.isAnyFieldInTheFormEmpty(result);
    if (field != ""){
      this.toastr.info('Field ' + field + ' empty', 'Inform');
      this.buttonsShow = true;
      return;
    }
    
    //todo check if fields emty

    this.taskDetail.id = 0;
    this.taskDetail.taskName = result.name.value;
    this.taskDetail.description = result.description.value;
    this.taskDetail.points = result.points.value;
    this.taskDetail.groupId = this.groupChallengedId;
    this.taskDetail.ownerId = Number(localStorage.getItem('id') || 0);
    this.taskDetail.deadline = result.date.value;
    this.taskDetail.status = 1;
    this.taskDetail.url = "";

    if (this.taskDetail.points > this.groupChallengerPoints){
      this.toastr.info('Not enough points', 'Inform');
      return;
    }
  
    this.taskService.createTask(this.taskDetail).subscribe(
      (response) => {
        let result: any;
        result =  response
        console.log(result)
        if (result.status == "CREATED") {
          this.toastr.success('Task Created', 'Success');
          this.router.navigate(['/usergroups']);
        }
        if (result == -1) {
          this.toastr.error('Something failed', 'Error');
        }
      },
      (error) => {
        console.log('Errors (CORS?) - ' + JSON.stringify(error));
      }
    );

    this.buttonsShow = true;


  }


  isAnyFieldInTheFormEmpty(form: any){
    for (let index = 0; index < form.length; index++) {
      const element = form[index];
      console.log(element.value)
      console.log(element.type)
      if(element.value == ""){
        return element.name;
      }
    }
    return "";
  }
}
