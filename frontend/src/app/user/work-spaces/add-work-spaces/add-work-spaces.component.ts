import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from "@angular/material/dialog";


@Component({
  selector: 'app-add-work-spaces',
  templateUrl: './add-work-spaces.component.html',
  styleUrls: ['./add-work-spaces.component.css']
})
export class AddWorkSpacesComponent implements OnInit {
  public errorMessage:String;
  public workspaceData: any;
  constructor(
    // public dialogRef: MatDialogRef<AddWorkSpacesComponent>
  ) {
    this.workspaceData = {};
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

    onNoClick(): void {
      // this.dialogRef.close();
    }
  saveWorkSpace(){
    if(!this.workspaceData.name){
      this.errorMessage = 'Incomplete Data';
      this.closeAlert();
    }else{
        alert('add work space');
    }
  }

   closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  close() {
    this.errorMessage = '';
  }


}
