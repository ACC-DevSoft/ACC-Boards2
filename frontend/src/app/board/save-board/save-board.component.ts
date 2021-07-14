import { CompilePipeMetadata } from "@angular/compiler";
import { Component, OnInit, Inject} from '@angular/core';
import { BoardService } from "../../services/board.service";
import { Router, ActivatedRoute } from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ListWorkspacesComponent} from "../../user/work-spaces/list-workspaces/list-workspaces.component";

@Component({
  selector: 'app-save-board',
  templateUrl: './save-board.component.html',
  styleUrls: ['./save-board.component.css']
})
export class SaveBoardComponent implements OnInit {
  public boardData: any;
  public errorMessage: String;
  public workspaceId: string;
  constructor(private boardService: BoardService, private router: Router, public ActivatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:{id:any}) {
    this.boardData = {};
    this.errorMessage = "";
    this.workspaceId = this.ActivatedRoute.snapshot.params.id;
   }

  ngOnInit(): void {
  }

  saveBoard() {
    if (!this.boardData.name || !this.boardData.description || !this.boardData.techleader) {
      console.log("Failed Process: Incomplete Data");
      this.errorMessage = "Failed Process: Incomplete Data"
      this.closeAlert();
    } else {
      this.boardService.createBoard(this.boardData, this.workspaceId).subscribe(
        (res: any) => {
          console.log(res);
          this.boardData = {};
          let current = localStorage.getItem('current')
          this.router.navigate(['/workSpaces', current])
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
