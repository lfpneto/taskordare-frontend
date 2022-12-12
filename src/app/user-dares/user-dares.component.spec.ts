import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserDaresComponent } from './user-dares.component';

describe('UserDaresComponent', () => {
  let component: UserDaresComponent;
  let fixture: ComponentFixture<UserDaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ UserDaresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
