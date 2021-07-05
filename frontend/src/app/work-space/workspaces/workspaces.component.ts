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
  public boardData: any;
  private userid: any


  constructor(private router: Router, private auth: AuthService, private workspace: WorkSpaceService, private board: BoardService, private ActivatedRoute: ActivatedRoute) {
    this.errorMessage = '';
    this.workspaceData = {}
    this.boardData = []
    this.userid = this.ActivatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {

    this.workspace.listWorkSpacesByUser(this.userid).subscribe(
      (res: any) => {
        console.log(res);
        this.workspaceData = res.workSpaces;
        console.log('WorkSpaces', this.workspaceData);
        this.workspaceData.forEach(({ boards }: any) => {
          console.log('Boards', boards);
          this.boardData = boards

        });

        console.log('BoardData',this.boardData);
        
      },
      (err) => {
        console.log(err.error);
        this.errorMessage = err.error;
        this.closeAlert();
      }
    )

    // this.board.listBoard('60e226e8836ff1651e123fbe').subscribe(
    //   (res:any)=>{
    //     console.log(res);

    //   }
    // )



  }

  closeAlert() {

  }
  callBoard() {

  }


}
