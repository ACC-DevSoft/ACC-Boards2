import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { WorkSpaceService } from "../../../services/work-space.service";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  public successMessage: String;
  public errorMessage: String;
  public userData: any;
  public arrayMembers: any[]

  constructor(private workSpace: WorkSpaceService, private auth: AuthService, private router: Router) {
    this.userData = {}
    this.successMessage = '';
    this.errorMessage = '';
    this.arrayMembers = []

  }

  ngOnInit(): void {

  }

  searchUser(user: string) {

    this.auth.getUsersByName(user).subscribe(
      (res:any) => {
        this.arrayMembers = res;
        console.log('arraymembers:', this.arrayMembers);
        

      }
    );

  }

  addMember() {
    if (!this.userData.username) {
      this.errorMessage = 'Proccess Failed: Incomplete data';
      this.closeAlert();
    } else {
      alert(this.userData.username);
    }
  }
  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
  closeX() { }

}
