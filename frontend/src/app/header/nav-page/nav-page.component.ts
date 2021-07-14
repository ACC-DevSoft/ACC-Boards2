import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.css']
})
export class NavPageComponent implements OnInit {
  public userId: any;

  constructor(public auth: AuthService) {
    this.userId = localStorage.getItem('current');
  }

  ngOnInit(): void {
  }

  forAdmin(){
    return this.auth.forAdmin()
  }
}
