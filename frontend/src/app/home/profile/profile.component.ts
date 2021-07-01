import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userData: any;
  constructor() { 
    this.userData = {}
  }

  ngOnInit(): void {
    this.userData = localStorage.getItem('data')
    this.userData = JSON.parse(this.userData)
    if(!this.userData.img) this.userData.img = "https://via.placeholder.com/50"
    if(this.userData.status) this.userData.status = "Activo"
    let text = this.userData.name;
    this.userData.name = text.charAt(0).toUpperCase() + text.slice(1);
  }

}
