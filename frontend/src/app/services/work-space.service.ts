import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {
  public env:String;

  constructor(private router: Router, private http: HttpClient) { 
    this.env = environment.APP_URL;
  }


  listWorkSpacesByUser(id:any){
    return this.http.get(this.env + "workSpace/listWorkSpaces/:_id", id);
  }
}
