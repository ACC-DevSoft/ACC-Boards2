import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-workspace',
  templateUrl: './list-workspace.component.html',
  styleUrls: ['./list-workspace.component.css']
})
export class ListWorkspaceComponent implements OnInit {

  opt: string;

  @Input() boards: any;
  @Input() wpData: any;


  constructor(public auth: AuthService, private router: Router) {
    this.opt = '';
  }


  ngOnInit(): void {
    console.log('board', this.boards);
    console.log('wpData', this.wpData);
  }

  createBoard() {

    if (!this.opt) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please, select a workspace',
      });

    } else {
      this.router.navigate(['/saveBoard', this.opt]);
    }

  }

  listBoard() {
    this.router.navigate(['/listBoard'])
  }
}
