import { Component, Inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { WorkSpaceService } from "../../../services/work-space.service";
import { AuthService } from '../../../services/auth.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ListWorkspacesComponent } from '../list-workspaces/list-workspaces.component';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {

  public successMessage: String;
  public errorMessage: String;
  public userData: any;
  public searchMembers: any[];
  public arrayMembers: any[];
  public arrayMembersTemp: any[];
  public members = new FormControl();
  public changeInput: any;
  public wpId: string;

  constructor(private workSpace: WorkSpaceService, private auth: AuthService, private router: Router, private dialogRef: MatDialogRef<ListWorkspacesComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.userData = {}
    this.successMessage = '';
    this.errorMessage = '';
    this.searchMembers = [];
    this.arrayMembers = [];
    this.arrayMembersTemp = [];
    this.wpId = data.workspaceId;

    this.loadMembers();

  }

  ngOnInit(): void {

    this.changeInput = this.members.valueChanges.subscribe(
      (res) => {
        debounceTime(500);
        console.log('changes', res);
        this.auth.getUsersByName(res).subscribe(
          (res: any) => {
            console.log('Dentro de changeUser', res);
            this.searchMembers = res;
          }
        );

      }
    )

  }

  loadMembers() {
    this.workSpace.listWorkSpacesById(this.wpId).subscribe(
      (res: any) => {
        console.log(res);
        const { members } = res;
        this.arrayMembersTemp = members;

      }
    )
  }

  searchUser(user: string) {

  }

  addMember() {
    console.log(this.members.value);
    this.workSpace.listWorkSpacesById(this.wpId).subscribe(
      (res: any) => {
        console.log(res);
      }
    );

    this.auth.getUsersByName(this.members.value).subscribe(
      (res: any) => {
        console.log('Member: ', res[0]);
        this.arrayMembersTemp.push(res[0]);
        console.log('ARRAYTEMP :', this.arrayMembersTemp);
        this.auth.updateArrayWorkspaces({ Admin: res[0]._id, workSpacesId: this.wpId }).subscribe(
          (res: any) => {
            console.log('UPDATE WORKSPACES', res);
          }
        )
      }
    );


  }

  delMember(userName) {

    this.arrayMembersTemp = this.arrayMembersTemp.filter(member => member.userName !== userName);

    this.workSpace.updateArrayMembers({ members: this.arrayMembersTemp, _id: this.wpId }).subscribe(
      (res: any) => {
        console.log(res);
      }
    )

    console.log('Nuevo array members', this.arrayMembersTemp);
  }

  closeMembers() {
    this.workSpace.updateArrayMembers({ members: this.arrayMembersTemp, _id: this.wpId }).subscribe(
      (res: any) => {
        console.log('ARRAYUPDATE: ', res);

      }
    )
  }

  refreshPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
  closeX() { }

}
