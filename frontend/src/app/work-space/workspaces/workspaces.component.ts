import { Component, OnInit } from '@angular/core';
import { WorkSpaceService } from "../../services/work-space.service";
import { BoardService } from "../../services/board.service";
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.css']
})
export class WorkspacesComponent implements OnInit {
  public errorMessage: String;
  public workspaceData: any;
  public wpBoards: any;
  public workspaces: any[] = []
  private userid: any


  constructor(private router: Router, private auth: AuthService, private workspace: WorkSpaceService, private board: BoardService, private ActivatedRoute: ActivatedRoute) {
    this.errorMessage = '';
    this.workspaceData = [];
    this.wpBoards = [];
    this.userid = this.ActivatedRoute.snapshot.params.id;

    this.loadWorkSpaces();
  }

  ngOnInit(): void {
    this.workspaces = this.workspaceData;
  }

  loadWorkSpaces() {

    this.workspace.listWorkSpacesByUser(this.userid).subscribe(
      (res: any) => {
        console.log(res);
        const { workSpaces } = res;
        this.workspaceData = workSpaces;
        console.log('WorkSpaces', workSpaces);

        for (let i = 0; i < this.workspaceData.length; i++) {
          this.wpBoards.push(this.workspaceData[i].boards);
        }

        console.log('WpBoards', this.wpBoards);

      },
      (err) => {
        console.log(err.error);
        this.errorMessage = err.error;
        this.closeAlert();
      }
    )

  }

  closeAlert() {

  }
  callBoard() {

  }


}
