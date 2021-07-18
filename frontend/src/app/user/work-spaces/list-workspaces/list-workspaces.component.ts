import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { BoardService } from "src/app/services/board.service";

import { AddMembersComponent } from '../add-members/add-members.component';
import { SaveBoardComponent } from '../../../board/save-board/save-board.component';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Component({
  selector: 'app-list-workspaces',
  templateUrl: './list-workspaces.component.html',
  styleUrls: ['./list-workspaces.component.css']
})
export class ListWorkspacesComponent implements OnInit {

  @Output() closeModal = new EventEmitter<boolean>();

  public successMessage: String;
  public errorMessage: String;
  public workspaceData: any;
  public wpBoards: any;
  public workspaces: any[] = []
  private userid: any

  constructor(private router: Router,
    private workspace: WorkSpaceService,
    private board: BoardService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {

    this.successMessage = '';
    this.errorMessage = '';
    this.workspaceData = [];
    this.wpBoards = [];
    this.userid = this.activatedRoute.snapshot.params.id;
    this.loadWorkSpaces();
  }

  ngOnInit(): void {
    this.loadWorkSpaces();
    this.workspaces = this.workspaceData;
  }

  loadWorkSpaces() {
    this.workspace.listWorkSpacesByUser(this.userid).subscribe(
      (res: any) => {
        console.log(res);
        const { workSpaces } = res;

        this.workspaceData = workSpaces.reverse();
        console.log('WorkSpaces', workSpaces);

        for (let i = 0; i < this.workspaceData.length; i++) {
          this.wpBoards.push(this.workspaceData[i].boards);
        }
        console.log('WpBoards', this.wpBoards);
      },
      (err) => {
        console.log(err.error);
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );

  }

  openBoard(idWS: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id: idWS }
    const dialogRef = this.dialog.open(SaveBoardComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        this.refreshPage();
      }
    );

  }

  openMembers() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddMembersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        this.refreshPage();
      }
    );
  }

  // Delete Work spaces
  onDelete(id: any, name: String) {
    if (confirm("Are you sure to delete workSpace: " + name + " ?")) {
      // alert("delete workspace");
      this.workspace.deleteWorkspace(id).subscribe(
        (res) => {
          console.log(res);
          this.successMessage = 'Successful to  delete WorkSpaces';
          this.closeAlert();
          this.refreshPage();
        },
        (err) => {
          console.log(err.error);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      );
    }
  }

  refreshPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  closeAlert() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
  closeX() {
    this.successMessage = '';
    this.errorMessage = '';
  }


}
