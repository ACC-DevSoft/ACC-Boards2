import { Component, OnInit} from '@angular/core';
import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

public userId: any;

  constructor(public auth: AuthService) { 
    this.userId = localStorage.getItem('current');
  }

  ngOnInit(): void {
  }

}
