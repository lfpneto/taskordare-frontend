import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateEditDareTasksComponent } from './create-edit-dare-tasks.component';

import {ToastModule} from 'primeng/toast';
import { ToastrModule } from 'ngx-toastr';

describe('CreateEditDareTasksComponent', () => {
  let component: CreateEditDareTasksComponent;
  let fixture: ComponentFixture<CreateEditDareTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-top-left',
          progressBar: true,
          timeOut: 3000
        }), // ToastrModule added
        ToastModule ],
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
