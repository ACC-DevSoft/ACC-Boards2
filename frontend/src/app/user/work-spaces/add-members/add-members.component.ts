import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  public errorMessage: String;

  constructor() { 
    this.errorMessage = '';
  }

  ngOnInit(): void {
  }
  addMember(){}
  closeAlert(){}
  closeX(){}

}
