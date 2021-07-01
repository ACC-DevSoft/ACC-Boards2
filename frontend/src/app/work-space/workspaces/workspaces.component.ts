import { Component, OnInit } from '@angular/core';
import { WorkSpaceService } from "../../services/work-space.service";
import { BoardService } from "../../services/board.service";
import { AuthService} from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.component.html',
  styleUrls: ['./workspaces.component.css']
})
export class WorkspacesComponent implements OnInit {
  public errorMessage: String;
  public workspaceData: any;
  public boardData: any;


  constructor(private router: Router, private auth: AuthService, private workspace: WorkSpaceService, private board: BoardService) { 
    this.errorMessage = '';
    this.workspaceData = {}
    this.boardData = {}
  }
  
  ngOnInit(): void {
    let current = JSON.stringify(this.auth.getCurrent());
    current = current.replace(/['"]+/g, '' );
    
    this.workspace.listWorkSpacesByUser(current).subscribe(
      (res:any)=>{
        console.log(res);
        this.workspaceData = res.workSpaces;
        console.log(this.workspaceData);
        // this.errorMessage = res.workSpaces;
      },
      (err)=>{
        console.log(err.error);
        this.errorMessage = err.error;
        this.closeAlert();
      }
    )

    this.board.listBoard(this).subscribe(
      (res:any)=>{
        console.log(res);
        
      }
    )


     
  }
  
  closeAlert(){
    
}
  callBoard(){

  }


}
