import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NavHomeComponent} from "../../header/nav-home/nav-home.component"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  public loginData: any;
  public errorMessage: String;

  constructor(private auth: AuthService, private router:Router, public dialogRef:MatDialogRef<NavHomeComponent>) { 
    this.loginData = {};
    this.errorMessage ='';
  }

  ngOnInit(): void {
  }

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = "Process Failed: Incomplete Data";
      this.loginData = {};
      this.closeAlert();
    } else {
      this.auth.login(this.loginData).subscribe(
        (res: any) => {
          console.log(res);
          const { current } = res;
          localStorage.setItem('current', current);
          localStorage.setItem('token', res.token);
          this.auth.setUserData(res.user)
          if (res.role === true) {this.auth.isAdmin()}
          this.closeForm()
          this.router.navigate(['/workSpaces', current]);
        },
        (err) => {
          console.log(err.error);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      )
    }
  }


  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  close() {
    this.errorMessage = '';
  }

  closeForm() {
    this.dialogRef.close()
  }

}
