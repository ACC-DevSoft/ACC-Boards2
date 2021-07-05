import { Component, OnInit } from '@angular/core';
import { AdminService} from "../../services/admin.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  public registerData: any; 
  public roleData: any;
  public successMessage: String;
  public errorMessage: String;


  constructor(private router: Router, private admin: AdminService) { 
    this.registerData = {};
    this.roleData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.admin.listRole().subscribe(
      (res: any) => {
        console.log(res);
        this.roleData = res.roles;
        console.log(this.roleData);
      },
      (err) => {
        console.log(err.error);

        this.errorMessage = err.error;
      }
    )
  }

  registerAdmin(){
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password ||
      !this.registerData.userName ||
      !this.registerData.roleId
    ){
      console.log('Register Failed: Incomplete Data');
      this.errorMessage = 'Register Failed: Incomplete Data';
      this.closeAlert()
      this.registerData = {};
    } else {
      this.admin.registerAdmin(this.registerData).subscribe(
        (res: any) => {
          console.log(res)
          this.registerData = {};
          this.router.navigate(['/listUser']);
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
  closeX() {
    this.errorMessage = '';
  }
}
