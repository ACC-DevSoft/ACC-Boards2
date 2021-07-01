import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  updateData: any; 
  roleData: any;
  userData: any;
  errorMessage: string;

  constructor(private admin: AdminService, private router: Router) { 
    this.updateData = {};
    this.roleData = {};
    this.userData = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.userData = localStorage.getItem('data');
    this.userData = JSON.parse(this.userData);
    this.userData.name

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

  updateUser(){
    if (
      !this.updateData.name ||
      !this.updateData.email ||
      !this.updateData.password ||
      !this.updateData.userName ||
      !this.updateData.roleId
    ){
      console.log('Update Failed: Incomplete Data');
      this.errorMessage = 'Update Failed: Incomplete Data';
      this.closeAlert()
      this.updateData = {};
    } else {
      this.admin.updateUser(this.updateData).subscribe(
        (res: any) => {
          console.log(res)
          this.updateData = {};
          this.router.navigate(['/listUser']);
        },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.error; 
          this.closeAlert()
          this.updateData = {};
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
