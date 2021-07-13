import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true
  public registerData: any;
  public errorMessage: String;

  constructor(private auth: AuthService, private router:Router) {
    this.registerData ={};
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.userName ||
      !this.registerData.email ||
      !this.registerData.password 
    ) {
      console.log('Register Failed: Incomplete Data');
      this.errorMessage = 'Register Failed: Incomplete Data';
      this.closeAlert()
      this.registerData = {};
    } else {
      this.auth.registerUser(this.registerData).subscribe(
        (res: any) => {
          console.log(res);
          const { current } = res;
          localStorage.setItem('current', current);
          localStorage.setItem('token', res.token);
          this.auth.setUserData(res.user)
          if (res.role === true) this.auth.isAdmin()
          this.router.navigate(['/workSpaces', current]);
          // console.log(res)
          // localStorage.setItem('token', res.token);
          // localStorage.setItem('data', JSON.stringify(res.user))
          // this.registerData = {};
          // this.router.navigate(['/workSpaces/:id',]);
        },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.error;
          this.closeAlert()
          this.registerData = {};
        }
      );
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
}
