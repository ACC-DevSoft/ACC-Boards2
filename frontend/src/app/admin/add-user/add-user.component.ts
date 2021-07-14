import { Component, OnInit ,Inject} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AdminService } from "../../services/admin.service";
import { ListUsersComponent } from '../list-users/list-users.component';

@Component({
  selector: 'app-add-user', 
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public registerData: any; 
  public roleData: any;
  public successMessage: String;
  public errorMessage: String;
  public data: any;
  public selected : any;

  constructor( private admin: AdminService, public dialogRef: MatDialogRef<ListUsersComponent>) { 
    this.registerData = {};
    this.roleData = {};
    this.successMessage = '';
    this.errorMessage = '';
    this.data = {}
    this.selected = new FormControl()
  }

  ngOnInit(): void {
    this.data = 
    this.admin.listRole().subscribe(
      (res: any) => {
        console.log(res);
        this.roleData = res.roles;
        console.log(this.roleData);
      },
      (err) => {
        this.errorMessage = err.error;
      }
    )
  }

  registerAdmin(){
    this.registerData.roleId = this.selected.value;
    if(!this.registerData.name || !this.registerData.userName || !this.registerData.email || !this.registerData.password || !this.registerData.roleId) {
      console.log('Register Failed: Incomplete Data');
      this.errorMessage = 'Register Failed: Incomplete Data';
      this.closeAlert()
      this.registerData = {};
    } else {
      this.admin.registerAdmin(this.registerData).subscribe(
        (res: any) => {
          console.log(res)
          this.successMessage = "User created successfully"
          this.registerData = {}
          this.closeAlert();
          this.closeDialog();
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
  closeDialog() {
    this.dialogRef.close();
  }
  closeAlert(){}
  close(){}

}
