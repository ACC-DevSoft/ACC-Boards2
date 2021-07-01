import { Component, OnInit } from '@angular/core';
import { WorkSpaceService } from "../../services/work-space.service";
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


  constructor(private router: Router, private auth: AuthService, private workspace: WorkSpaceService) { 
    this.errorMessage = '';
    this.workspaceData = {}
  }
  
  ngOnInit(): void {
    let current = JSON.stringify(this.auth.getCurrent());
    current = current.replace(/['"]+/g, '' );
    
    this.workspace.listWorkSpacesByUser(current).subscribe(
      (res:any)=>{
        console.log(res);
        this.workspaceData = res.workSpaces;
        // this.errorMessage = res.workSpaces;
      },
      (err)=>{
        console.log(err.error);
        this.errorMessage = err.error;
        this.closeAlert();
      }
    )
     
  }
  
  closeAlert(){
}


}
