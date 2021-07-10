import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private env: String;
  public Admin: Boolean;
  public userData: Object;

  constructor(private http: HttpClient, private router: Router) { 
    this.env = environment.APP_URL;
    this.Admin = false;
    this.userData = {};
  }

  registerRole(role: any){
    return this.http.post(this.env + 'role/registerRole', role)
  }
}
