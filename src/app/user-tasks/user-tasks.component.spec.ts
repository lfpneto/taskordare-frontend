import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ToastModule} from 'primeng/toast';
import { ToastrModule } from 'ngx-toastr';
import { UserTasksComponent } from './user-tasks.component';

describe('UserTasksComponent', () => {
  let component: UserTasksComponent;
  let fixture: ComponentFixture<UserTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, 
        ToastrModule.forRoot({
        positionClass: 'toast-top-left',
        progressBar: true,
        timeOut: 3000
      }), // ToastrModule added
      ToastModule ],
      declarations: [ UserTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
