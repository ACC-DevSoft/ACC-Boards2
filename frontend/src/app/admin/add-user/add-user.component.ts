import { Component, OnInit ,Inject} from '@angular/core';
import { Router } from "@angular/router";
import { AdminService } from "../../services/admin.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

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


  constructor(private router: Router, private admin: AdminService,) { 
    this.registerData = {};
    this.roleData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
    
  }

  registerAdmin(){}
  closeAlert(){}
  close(){}

}
