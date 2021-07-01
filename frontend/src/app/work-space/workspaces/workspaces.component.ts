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
  public errorMessage: any;

  constructor(private router: Router, private auth: AuthService, private workspace: WorkSpaceService) { 
    this.errorMessage = '';
  }

  ngOnInit(): void {
    let id = this.auth.getCurrent();
    this.errorMessage = JSON.stringify(id);
    console.log(id);
    
    this.workspace.listWorkSpacesByUser(id).subscribe(
      (res:any)=>{
        console.log(res);
        
      }
    )
     
  }
  


}
