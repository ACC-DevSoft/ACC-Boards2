import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RegisterRoleComponent } from "../register-role/register-role.component";

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {
  public roleData: any;
  public errorMessage: String;
  public data: any;

  constructor(private admin: AdminService, private router: Router, public dialog:MatDialog) { 
    this.roleData = {};
    this.errorMessage = '';
    this.data = {};
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
  closeAlert(){
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  openForm(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(RegisterRoleComponent, dialogConfig);
  }

}
