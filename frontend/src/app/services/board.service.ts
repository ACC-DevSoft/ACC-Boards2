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

  createBoard(board: any, id: string) {
    return this.http.post(this.env +"board/create/"+ id, board)
  }

  listBoard(boardId:any){
    return this.http.get(this.env + "board/list" + boardId)
  }

  updateBoard(board:any){
    return this.http.put(this.env + "board/update", board)
  }
 
  deleteBoard(boardId:any){
    return this.http.delete(this.env + "board/delete/" + boardId)
  }
}
