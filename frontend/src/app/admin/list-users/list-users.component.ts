import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AdminService } from "../../services/admin.service";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddUserComponent } from "../add-user/add-user.component"; 
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
    public userData: any;
    public roleData:any;
    public errorMessage:String;

 constructor(private admin: AdminService, private router: Router, public dialog:MatDialog, private ngZone: NgZone) { 
    this.userData = {};
    this.roleData = {};
    this.errorMessage = '';
  }


  ngOnInit(): void {
    this.admin.listUsers().subscribe(
      (res:any)=>{
        console.log(res);
        this.userData = res.users; 
        console.log(this.userData);
      }, 
      (err) =>{
        this.errorMessage = err.error;
      }
    )

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
   closeAlert(){
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
  closeX(){ 
    
  }

  openForm():void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = this.roleData;
    this.dialog.open(AddUserComponent, dialogConfig)
  }

}
