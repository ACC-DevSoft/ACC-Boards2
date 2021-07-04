import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks: any[] = [];
  id: String;
  taskId: String;
  taskData: any;
  edition: boolean;
  selectedFile:any;

  constructor(public board: BoardService, private router: Router, private activateRoute: ActivatedRoute, public fb: FormBuilder) {

    this.id = this.activateRoute.snapshot.params.id;
    this.taskId = '';
    this.loadTask();
    this.taskData = {}
    this.edition = false;
    this.selectedFile = null;

  }

  ngOnInit(): void { }

  loadTask() {
    this.board.listTask(this.id).subscribe(
      (res: any) => {
        this.tasks = res.tasks;
      }
    )
  }

  changeStatus(task: any, status: string) {

    task.status = status;

    this.board.updateTask(task).subscribe(
      res => {
        task.status = status;
        console.log(task.status);

      }
    );

  }
  createTask() {
    this.router.navigate(['/addTask', this.id]);
  }

  editTask(task: any) {
    const { name, description, _id } = task;
    this.taskId = _id;
    this.edition = true;
    this.taskData = { _id, name, description }
    // this.loadTask();
    // this.router.navigate(['/updateTask', task._id])

    console.log(task);

  }

  saveChanges() {
    this.edition = false
    this.board.updateTask(this.taskData).subscribe(
      res => {
        console.log(res);
        this.loadTask();

      }
    )
  }

  uploadImg(event: any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  deleteTask(id: any) {
    this.board.deleteTask(id).subscribe(
      res => {

        this.loadTask();

      }
    )

  }



  drop(e: any) {
    console.log('ok!', e)

    moveItemInArray(this.tasks, e.previousIndex, e.currentIndex);



  }

}
