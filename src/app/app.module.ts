import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';  
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { InformationComponent } from './information/information.component';
import { RegisterComponent } from './register/register.component';
import { UsersMainComponent } from './users-main/users-main.component'; 
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UserDaresComponent } from './user-dares/user-dares.component';
import { UserGoalsComponent } from './user-goals/user-goals.component';
import { UserGroupGoalComponent } from './user-group-goal/user-group-goal.component';
import { UserGoalComponent } from './user-goal/user-goal.component';





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
    UserGoalsComponent,
    UserGroupGoalComponent,
    UserGoalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,   //Assign FormsModule
    HttpClientModule,
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
        path : 'usergoals',  
        component : UserGoalsComponent
      },
      {
        path : 'usergroupgoal',  
        component : UserGroupGoalComponent
      },
      {
        path : 'usergoal',  
        component : UserGoalComponent
      },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
