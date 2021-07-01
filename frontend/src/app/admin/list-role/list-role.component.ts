import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {
  public roleData: any;
  public errorMessage: String;

  constructor(private admin: AdminService, private router: Router) { 
    this.roleData = {};
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
        this.errorMessage = err.error;
      }
    )
  }

  closeAlert(){
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
}
