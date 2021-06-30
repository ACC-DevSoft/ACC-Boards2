import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-list-workspace',
  templateUrl: './list-workspace.component.html',
  styleUrls: ['./list-workspace.component.css']
})
export class ListWorkspaceComponent implements OnInit {

  constructor(public auth:AuthService, private router: Router) { }
 

  ngOnInit(): void {
  }


   createBoard() {
      this.router.navigate(['/saveBoard'])
   }
}
