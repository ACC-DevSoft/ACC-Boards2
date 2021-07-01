import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-board',
  templateUrl: './list-board.component.html',
  styleUrls: ['./list-board.component.css']
})
export class ListBoardComponent implements OnInit {
  public boardData: any;
  public errorMessage: String;
  public successMessage: String;
  constructor() { 
    this.boardData = {};
    this.errorMessage = "";
    this.successMessage = "";
  }

  ngOnInit(): void {
  }

  updateBoard() {}

  deleteBoard() {}
  
}
