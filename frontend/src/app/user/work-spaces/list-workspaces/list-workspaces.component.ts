import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { BoardService } from "src/app/services/board.service";

import { AddMembersComponent } from '../add-members/add-members.component';
import { SaveBoardComponent } from '../../../board/save-board/save-board.component';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-list-workspaces',
  templateUrl: './list-workspaces.component.html',
  styleUrls: ['./list-workspaces.component.css']
})
export class ListWorkspacesComponent implements OnInit {

  public successMessage: String;
  public errorMessage: String;
  public workspaceData: any;
  public wpBoards: any;
  public workspaces: any[] = [];
  private userid: any;
  private userLogged: any;

  constructor(private router: Router,
    private workspace: WorkSpaceService,
    private auth: AuthService,
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
        console.log('RES', res.workSpacesId);
        const { workSpacesId } = res;
        console.log(workSpacesId);

        this.workspaceData = workSpacesId.reverse();
        console.log('WorkSpaces', workSpacesId);

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

      //   console.log('WorkSpaces', workSpaces);
      // (res: any) => {
      //   console.log(res);

      //   const { workSpaces } = res;

      //   this.workspaceData = workSpaces.reverse();
      //   console.log('WorkSpaces', workSpaces);

      //   for (let i = 0; i < this.workspaceData.length; i++) {
      //     this.wpBoards.push(this.workspaceData[i].boards);
      //   }
      //   console.log('WpBoards', this.wpBoards);
      // },
      // (err) => {
      //   console.log(err.error);
      //   this.errorMessage = err.error;
      //   this.closeAlert();
      // }
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


  deleteBoard(arrayBoards: any, workspaceId: any, id: string) {
    let boards = arrayBoards.filter((board: any) => board._id != id);

    console.log({ boards });

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.board.deleteBoard(id).subscribe(
          (res) => {
            console.log(res);
            this.workspace.updateArrayBoards({ boards, workspaceId }).subscribe(
              res => { console.log(res) },
              err => { console.log(err) }
            );
            this.successMessage = 'Successful to  delete Board';
            Swal.fire(
              this.successMessage.toString()
            );
            this.refreshPage();
          },
          (err) => {
            console.log(err.error);
            this.errorMessage = err.error;
            Swal.fire(
              this.errorMessage.toString()
            );
          }
        );
      }
    });

  }

  openMembers(workspaceId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = true;
    dialogConfig.data = { workspaceId };
    const dialogRef = this.dialog.open(AddMembersComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        this.refreshPage();
      }
    );
  }

  // Delete Workspaces
  onDelete(workSpace: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const { _id  } = workSpace;
        console.log({ _id });

        this.auth.getUserById(this.userid).subscribe(
          (res: any) => {
            console.log(res);
            const { workSpacesId: wpList } = res;
            console.log(wpList);

            let workSpacesId = wpList.filter((wp: any) => wp != _id);

            console.log('Nueno array wp', workSpacesId);

            this.auth.updateArrayWorkspaces({ Admin: this.userid, workSpacesId }).subscribe(
              res => { console.log(res) }
            )

          },
          err => { console.log(err) }
        );

        this.workspace.deleteWorkspace(_id).subscribe(
          (res) => {
            console.log(res);
            this.successMessage = 'Successful to  delete WorkSpaces';
            Swal.fire(
              this.successMessage.toString()
            );
            this.refreshPage();
          },
          (err) => {
            console.log(err.error);
            this.errorMessage = err.error;
            Swal.fire(
              this.errorMessage.toString()
            );
          }
        );

      }
    });
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
