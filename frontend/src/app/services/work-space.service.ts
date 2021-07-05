import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {
  public env: String;

  constructor(private router: Router, private http: HttpClient) {
    this.env = environment.APP_URL;
  }


  listWorkSpacesByUser(id: String) {
    return this.http.get(this.env + "workSpace/listWorkSpaces/" + id);
  }

  createWorkspace(body: any, id: string) {
    return this.http.post(this.env + "workSpace/newWorkSpace/" + id, body);
  }
}
