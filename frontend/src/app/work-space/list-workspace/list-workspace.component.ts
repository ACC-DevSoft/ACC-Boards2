import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

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
