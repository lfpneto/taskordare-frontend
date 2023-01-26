import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ToastModule} from 'primeng/toast';
import { ToastrModule } from 'ngx-toastr';
import { UserGroupsComponent } from './user-groups.component';

describe('UserGroupsComponent', () => {
  let component: UserGroupsComponent;
  let fixture: ComponentFixture<UserGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, 
        ToastrModule.forRoot({
        positionClass: 'toast-top-left',
        progressBar: true,
        timeOut: 3000
      }), // ToastrModule added
      ToastModule ],
      declarations: [ UserGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
