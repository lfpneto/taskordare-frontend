import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';  
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';

//import { Interceptor } from './app.interceptor';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { InformationComponent } from './information/information.component';
import { RegisterComponent } from './register/register.component';
import { UsersMainComponent } from './users-main/users-main.component'; 
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UserDaresComponent } from './user-dares/user-dares.component';
import { UserTasksComponent } from './user-tasks/user-tasks.component';
import { UserGroupTasksComponent } from './user-group-tasks/user-group-tasks.component';
import { CreateEditDareTasksComponent } from './create-edit-dare-tasks/create-edit-dare-tasks.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InformationComponent,
    RegisterComponent,
    UsersMainComponent,
    LogoutComponent,
    UserGroupsComponent,
    UserDaresComponent,
    UserTasksComponent,
    UserGroupTasksComponent,
    CreateEditDareTasksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,   //Assign FormsModule
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    RippleModule,
    RouterModule.forRoot([  
      {  
        path : '',  
        component : InformationComponent   
      },  
      {  
        path : 'login',  
        component : LoginComponent    
      },  
      {  
          path : 'logout',  
          component : LogoutComponent
      }, 
      {  
          path : 'register',  
          component : RegisterComponent
      }, 
      {
        path : 'usermain',  
        component : UsersMainComponent
      },
      {
        path : 'usergroups',  
        component : UserGroupsComponent
      },
      {
        path : 'userdares',  
        component : UserDaresComponent
      },
      {
        path : 'usergrouptasks',  
        component : UserGroupTasksComponent
      },
      {
        path : 'usertasks',  
        component : UserTasksComponent
      },
      {
        path : 'createeditdaretasks',  
        component : CreateEditDareTasksComponent
      },

    ])
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
