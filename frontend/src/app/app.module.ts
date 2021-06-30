import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { ListTaskComponent } from './board/list-task/list-task.component';
import { SaveTaskComponent } from './board/save-task/save-task.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { AuthService } from './services/auth.service';
import { BoardService } from './services/board.service';
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

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListWorkspaceComponent } from './work-space/list-workspace/list-workspace.component';
import { WorkspacesComponent } from './work-space/workspaces/workspaces.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ListTaskComponent,
    SaveTaskComponent,
    ListRoleComponent,
    ListUserComponent,
    RegisterUserComponent,
    UpdateRoleComponent,
    RegisterRoleComponent,
    UpdateUserComponent,
    ListWorkspaceComponent,
    WorkspacesComponent
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
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
  ],
  providers: [AuthService,
    BoardService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
