import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkSpaceService } from '../../services/work-space.service';

@Component({
  selector: 'app-save-workspace',
  templateUrl: './save-workspace.component.html',
  styleUrls: ['./save-workspace.component.css']
})
export class SaveWorkspaceComponent implements OnInit {

  public workspaceData: any;
  public errorMessage: String;
  public userId: string;

  constructor(private workSpaceService: WorkSpaceService, private router: Router, public ActivatedRoute: ActivatedRoute) {
    this.workspaceData = {};
    this.errorMessage = '';
    this.userId = this.ActivatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
  }

  saveWorkspace() {
    if (!this.workspaceData.name || !this.workspaceData.description) {
      console.log("Failed Process: Incomplete Data");
      this.errorMessage = "Failed Process: Incomplete Data"
      this.closeAlert();
    } else {
      this.workSpaceService.createWorkspace( this.workspaceData,this.userId).subscribe(
        (res: any) => {
          console.log(res);
          this.workspaceData = {};

          this.router.navigate(['/workSpaces', this.userId])
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert()
        }
      )
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
