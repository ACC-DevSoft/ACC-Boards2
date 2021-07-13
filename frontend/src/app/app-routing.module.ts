import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { WorkSpacesComponent } from './user/work-spaces/work-spaces.component';
import { ListRoleComponent } from "./admin/list-role/list-role.component";
import { RegisterRoleComponent } from './admin/register-role/register-role.component'
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';
import { SaveTaskComponent } from './tasks/save-task/save-task.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'workSpaces/:id',
    component: WorkSpacesComponent
  },
  {
    path:'listUsers',
    component:ListUsersComponent
  },
  {
    path: 'listRoles',
    component: ListRoleComponent
  },
  {
    path:'registerRole',
    component: RegisterRoleComponent
  },
  {
    path: 'listTasks/:id',
    component: ListTasksComponent,
  },
  {
    path: 'updateTask/:id',
    component: SaveTaskComponent,
  },
  {
    path: 'addTask/:id',
    component: SaveTaskComponent,
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
