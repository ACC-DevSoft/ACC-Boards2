import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerData: any;
  public errorMessage: String;

  constructor() {
    this.registerData ={};
    this.errorMessage = '';
   }

  ngOnInit(): void {
  }

  registerUser(){
    if(!this.registerData.name){
      this.errorMessage = 'Incomplete Data.';
      this.closeAlert();
    }else{
      alert('login');
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
