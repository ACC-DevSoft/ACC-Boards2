import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { ListTaskComponent } from './board/list-task/list-task.component';
import { SaveTaskComponent } from './board/save-task/save-task.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { AuthGuard } from "./guard/auth.guard";
import { WorkspacesComponent } from './work-space/workspaces/workspaces.component';
import { SaveBoardComponent } from "./board/save-board/save-board.component";
import { ListBoardComponent } from "./board/list-board/list-board.component";
import { ProfileComponent } from "./home/profile/profile.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'workSpaces',
    component:WorkspacesComponent,
  },

  {
    path: 'saveBoard',
    component:SaveBoardComponent,
  },

  {
    path: 'listRole',
    component: ListRoleComponent,
  },
  {
    path: 'updateRole',
    component: UpdateRoleComponent,
  },
  {
    path: 'registerRole',
    component: RegisterRoleComponent,
  },
  {
    path: 'listUser',
    component: ListUserComponent,
  },
  {
    path: 'updateUser/:user?',
    component: UpdateUserComponent,
  },
  {
    path: 'registerUser',
    component: RegisterUserComponent,
  },
  {
    path: 'listTask/:id',
    component: ListTaskComponent,
  },
  {
    path: 'updateTask/:id',
    component: SaveTaskComponent,
  },
  {
    path: 'addTask/:id',
    component: SaveTaskComponent,
  },
  {
    path: 'listBoard',
    component: ListBoardComponent,
  },

  {
    path: 'profile',
    component: ProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
