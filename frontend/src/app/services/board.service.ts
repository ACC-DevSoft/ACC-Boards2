import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public env: String;
  constructor(private http: HttpClient) { 
    this.env = environment.APP_URL;
  }

  createBoard(board: any) {
    return this.http.post(this.env +"board/create", board)
  }
  listBoard(board: any){    
    return this.http.get(this.env + "list/" + board)
  }
}
