import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from "@angular/material/dialog";
import { AddWorkSpacesComponent } from './add-work-spaces/add-work-spaces.component';
import { Router , ActivatedRoute} from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-work-spaces',
  templateUrl: './work-spaces.component.html',
  styleUrls: ['./work-spaces.component.css']
})
export class WorkSpacesComponent implements OnInit {
  public userid: any;
  public userId:any;
  
  constructor(
    private router:Router, private activated: ActivatedRoute,
    private auth: AuthService,
    public dialog:MatDialog,
    //public dialogRef: MatDialogRef<AddWorkSpacesComponent>
  ){ 
    this.userid = this.activated.snapshot.params.id;
     this.userId = localStorage.getItem('current');

  }

  ngOnInit(): void {
    console.log(this.userid);
    
  }
  openForm(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = {id: this.userId};
    const dialogRef= this.dialog.open(AddWorkSpacesComponent, dialogConfig);
  }
  


}
