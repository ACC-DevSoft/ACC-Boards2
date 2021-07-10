import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData: any;
  public errorMessage: String;

  constructor() { 
    this.loginData = {};
    this.errorMessage ='';
  }

  ngOnInit(): void {
  }
  login(){
    if(!this.loginData.email || this.loginData.passwords){
      this.errorMessage = 'Incomplete data';
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
