import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BoardService } from "../../services/board.service";

@Component({
  selector: 'app-list-board',
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.css']
})
export class ListBoardComponent implements OnInit {
  public boardData: any;
  public errorMessage: String;
  public successMessage: String;
  constructor(private board: BoardService, private router: Router) { 
    this.boardData = {};
    this.errorMessage = "";
    this.successMessage = "";
    this.boardData.id = "60db3272728da31738b54b45"
  }

  ngOnInit(): void {
    this.board.listBoard(this.boardData.id).subscribe(
      (res: any) => {
        console.log(res);
        this.boardData = res.board;        
      },
      (err) => {

      }
    )
  }

  updateBoard() {}

  deleteBoard() {}

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
  }

}
