import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guard/auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDialogModule } from "@angular/material/dialog";
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'; 


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './home/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { WorkSpacesComponent } from './user/work-spaces/work-spaces.component';
import { NavHomeComponent } from './header/nav-home/nav-home.component';
import { NavPageComponent } from './header/nav-page/nav-page.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './home/login/login.component';
import { AddWorkSpacesComponent } from './user/work-spaces/add-work-spaces/add-work-spaces.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';
import { SaveTaskComponent } from './tasks/save-task/save-task.component';
import { GetImgPipe } from './pipes/get-img.pipe';
import { ListWorkspacesComponent } from './user/work-spaces/list-workspaces/list-workspaces.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { SaveBoardComponent } from './board/save-board/save-board.component';
import { ListBoardComponent } from './board/list-board/list-board.component';
import { AddMembersComponent } from './user/work-spaces/add-members/add-members.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHomeComponent,
    HomeComponent,
    RegisterComponent,
    NavPageComponent,
    WorkSpacesComponent,
    ProfileComponent,
    RegisterRoleComponent,
    ListRoleComponent,
    LoginComponent,
    AddWorkSpacesComponent,
    ListUsersComponent,
    AddUserComponent,
    ListWorkspacesComponent,
    EditProfileComponent,
    SaveBoardComponent,
    ListBoardComponent,
    ListTasksComponent,
    SaveTaskComponent,
    GetImgPipe,
    AddMembersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatTreeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents:[AddWorkSpacesComponent]
})
export class AppModule { }