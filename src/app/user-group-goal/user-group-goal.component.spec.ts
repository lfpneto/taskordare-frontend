import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupGoalComponent } from './user-group-goal.component';

describe('UserGroupGoalComponent', () => {
  let component: UserGroupGoalComponent;
  let fixture: ComponentFixture<UserGroupGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupGoalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGroupGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
