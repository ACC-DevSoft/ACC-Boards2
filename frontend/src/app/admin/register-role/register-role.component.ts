import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdminService } from "../../services/admin.service";

@Component({
  selector: 'app-register-role',
  templateUrl: './register-role.component.html',
  styleUrls: ['./register-role.component.css']
})
export class RegisterRoleComponent implements OnInit {
  public registerData: any;
  public errorMessage: String;
  public successMessage: String;

  constructor(private admin: AdminService, private router:Router) {
    this.registerData ={};
    this.errorMessage = '';
    this.successMessage = '';
   }

  ngOnInit(): void {
  }

  registerRole(){
    if(!this.registerData.name || !this.registerData.description) {
      console.log('Register Failed: Incomplete Data');
      this.errorMessage = 'Register Failed: Incomplete Data';
      this.closeAlert()
      this.registerData = {};
    } else {
      this.admin.registerRole(this.registerData).subscribe(
        (res: any) => {
          console.log(res)
          this.successMessage = "Role created successfully"
          this.registerData = {}
          this.closeAlert()
        },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.error;
          this.closeAlert()
          this.registerData = {};
        }
      )
    }
  }
  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000);
  }

  close() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
