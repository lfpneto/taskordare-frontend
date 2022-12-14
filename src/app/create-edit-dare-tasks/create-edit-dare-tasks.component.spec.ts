import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDareTasksComponent } from './create-edit-dare-tasks.component';

describe('CreateEditDareTasksComponent', () => {
  let component: CreateEditDareTasksComponent;
  let fixture: ComponentFixture<CreateEditDareTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditDareTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditDareTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
