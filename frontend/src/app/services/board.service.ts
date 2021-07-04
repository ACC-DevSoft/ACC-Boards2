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
    return this.http.post(this.env + "board/create", board)
  }

  addTask(board: any) {

    return this.http.post<any>(this.env + 'board/addTask', board);

  }
  addTaskImg(board: any) {

    return this.http.post<any>(this.env + 'board/addTask', board);

  }

  getImg(url: string) {
    return this.http.get(url);
  }

  listTask(boardId: any) {
    return this.http.get<any>(this.env + 'board/getTasks/' + boardId)
  }

  updateTask(body: any) {
    return this.http.put<any>(this.env + 'board/updateTask/'+ body._id, body)
  }

  updateImg(collection: string,id:any,image: any) {
    return this.http.put<any>(`${this.env}uploads/${collection}/${id}`, image)
  }

  deleteTask(id: any ){
    return this.http.delete<any>(this.env + 'board/deleteTask/'+ id)
  }
  listBoard(board: any){    
    return this.http.get(this.env + "list/" + board)
  }
}
