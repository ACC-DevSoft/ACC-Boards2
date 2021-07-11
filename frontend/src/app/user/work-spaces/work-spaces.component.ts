import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from "@angular/material/dialog";
import { AddWorkSpacesComponent } from './add-work-spaces/add-work-spaces.component';

@Component({
  selector: 'app-work-spaces',
  templateUrl: './work-spaces.component.html',
  styleUrls: ['./work-spaces.component.css']
})
export class WorkSpacesComponent implements OnInit {

  constructor(
    public dialog:MatDialog,
    public dialogRef: MatDialogRef<AddWorkSpacesComponent>
  ){ }

  ngOnInit(): void {
  }
  openForm(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    this.dialog.open(AddWorkSpacesComponent, dialogConfig);
  }
  


}
