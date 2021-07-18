import { Component, OnInit, Inject} from '@angular/core';
import { BoardService } from "../../services/board.service";
import { Router, ActivatedRoute } from "@angular/router";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ListWorkspacesComponent} from "../../user/work-spaces/list-workspaces/list-workspaces.component";
import { WorkSpacesComponent } from '../../user/work-spaces/work-spaces.component';

@Component({
  selector: 'app-save-board',
  templateUrl: './save-board.component.html',
  styleUrls: ['./save-board.component.css']
})
export class SaveBoardComponent implements OnInit {
  public successMessage:String;
  public boardData: any;
  public errorMessage: String;
  public dataId: any;
  // public closeModal: number = 0;

  constructor(private boardService: BoardService, 
              private router: Router, 
              public ActivatedRoute: ActivatedRoute,
              private dialogRef: MatDialogRef<ListWorkspacesComponent>,
              @Inject(MAT_DIALOG_DATA) data:any)
 {
    this.dataId = data.id
    this.boardData = {};
    this.errorMessage = "";
    this.successMessage = "";
   }

  ngOnInit(): void {
    console.log(this.dataId);
    
  }

  saveBoard() {
    if (!this.boardData.name || !this.boardData.description || !this.boardData.techleader) {
      console.log("Failed Process: Incomplete Data");
      this.errorMessage = "Failed Process: Incomplete Data"
      this.closeAlert();
    } else {
      this.boardService.createBoard(this.boardData, this.dataId).subscribe(
        (res: any) => {
          console.log(res);
          this.boardData = {};
          this.successMessage ='Successful adding board';
          // let current = localStorage.getItem('current')
          // this.router.navigate(['/workSpaces', current]);
          this.closeDialog();
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert()
        }
      )
    }
  }

  
  
  closeDialog(){
    this.dialogRef.close();
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
