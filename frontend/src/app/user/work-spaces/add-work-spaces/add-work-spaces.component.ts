import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, DialogRole } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { WorkSpaceService } from "../../../services/work-space.service";
import { AuthService } from "../../../services/auth.service";
import { WorkSpacesComponent } from "../work-spaces.component";


@Component({
  selector: 'app-add-work-spaces',
  templateUrl: './add-work-spaces.component.html',
  styleUrls: ['./add-work-spaces.component.css']
})
export class AddWorkSpacesComponent implements OnInit {
  public errorMessage: String;
  public successMessage: String;
  public workspaceData: any;
  public user: any;
  public userId: any;

  constructor(
    private router: Router, private workspace: WorkSpaceService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<WorkSpacesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkSpacesComponent
  ) {
    this.workspaceData = {};
    this.errorMessage = '';
    this.successMessage = '';
    this.userId = localStorage.getItem('current');

  }

  ngOnInit(): void {
  }

  saveWorkSpace() {
    if (!this.workspaceData.name) {
      this.errorMessage = 'Incomplete Data';
      this.closeAlert();

    } else {
      this.auth.getUserById(this.userId).subscribe(
        (res: any) => {
          this.user = res;
        }
      );
      this.workspace.createWorkspace(this.workspaceData, this.userId).subscribe(

        (res: any) => {
          console.log('WP CREADO', res);
          const { result } = res;
          const { members, _id } = result;


          console.log('USER;', this.user);

          console.log('RESULT: ', result);
          result.members.push(this.user);

          console.log('MEMBERs: ', members);

          this.workspace.updateArrayMembers({ members, _id }).subscribe(
            (res: any) => {
              console.log('ARRAY NUEVo MEMbers', res);

            }
          )


          this.workspaceData = {};
          this.successMessage = 'Success adding  workspace';
          this.closeDialog();

        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      )
    }
  }

  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['/workSpaces', this.userId]);
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  close() {
    this.errorMessage = '';
  }


}
