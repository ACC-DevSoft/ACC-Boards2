import { Component, OnInit } from '@angular/core';
import { AdminService } from "../../services/admin.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  public userData: any;
  public errorMessage:String; 

  constructor(private admin: AdminService, private router: Router) { 
    this.userData = {};
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
  }

  updateUser(){
    this.admin.updateUser(this.userData).subscribe(
      (res)=>{
        console.log(res);
        this.userData = {};
        this.router.navigate(['/updateUser']);
      },
      (err)=>{
        console.log(err);
        this.errorMessage = err.console.error();
        this.closeAlert();
        
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
}
