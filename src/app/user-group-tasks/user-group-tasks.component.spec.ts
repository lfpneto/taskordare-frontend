import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserGroupTasksComponent } from './user-group-tasks.component';

describe('UserGroupTasksComponent', () => {
  let component: UserGroupTasksComponent;
  let fixture: ComponentFixture<UserGroupTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ UserGroupTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
