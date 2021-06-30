import { CompilePipeMetadata } from "@angular/compiler";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BoardService } from "../../services/board.service";



@Component({
  selector: 'app-save-board',
  templateUrl: './save-board.component.html',
  styleUrls: ['./save-board.component.css']
})
export class SaveBoardComponent implements OnInit {
  public boardData: any;
  public errorMessage: String;

  constructor(private boardService: BoardService, private router: Router) {
    this.boardData = {};
    this.errorMessage = "";
   }

  ngOnInit(): void {
  }

  saveBoard() {
    if (!this.boardData.name || !this.boardData.description || !this.boardData.workspace || !this.boardData.techleader) {
      console.log("Failed Process: Incomplete Data");
      this.errorMessage = "Failed Process: Incomplete Data"
      this.closeAlert();
    } else {
      this.boardService.createBoard(this.boardData).subscribe(
        (res: any) => {
          console.log(res);
          this.boardData = {};
          //this.router.navigate(['listBoard'])
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert()          
        }
      )
    }
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
  }
}
