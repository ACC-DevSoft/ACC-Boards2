import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-work-spaces',
  templateUrl: './add-work-spaces.component.html',
  styleUrls: ['./add-work-spaces.component.css']
})
export class AddWorkSpacesComponent implements OnInit {
  public errorMessage:String;
  public workspaceData: any;
  constructor() {
    this.workspaceData = {};
    this.errorMessage = '';
   }

  ngOnInit(): void {
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
