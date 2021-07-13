import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public userData: any;

  constructor(private auth: AuthService) { 
    this.userData = {}
  }

  ngOnInit(): void {
    this.userData = this.auth.getUserData()
    if(!this.userData.img) this.userData.img = "https://via.placeholder.com/50"
    if(this.userData.status) this.userData.status = "Activo"
    let text = this.userData.name;
    this.userData.name = text.charAt(0).toUpperCase() + text.slice(1);
  }

}
