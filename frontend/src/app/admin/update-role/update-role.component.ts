import { Component, OnInit } from '@angular/core';
import { AdminService} from "../../services/admin.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
  roleData: any;
  successMessage: String;
  errorMessage: String;

  constructor(private router: Router, private admin: AdminService) { 
    this.roleData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
  }

 updateRole(){
    if (
      !this.roleData.name ||
      !this.roleData.description
    ){
      console.log('Update Failed: Incomplete Data');
      this.errorMessage = 'Update Failed: Incomplete Data';
      this.closeAlert()
      this.roleData = {};
    } else {
      this.admin.updateRole(this.roleData).subscribe(
        (res: any) => {
          console.log(res)
          this.roleData = {};
          this.router.navigate(['/listRole']);
        },
        (err: any) => {
          console.log(err)
          this.errorMessage = err.error; 
          this.closeAlert()
          this.roleData = {};
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
