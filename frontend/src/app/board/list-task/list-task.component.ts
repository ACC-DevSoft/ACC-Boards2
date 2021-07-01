import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  toppings: FormGroup;
  tasks: any[] = [];

  constructor(private http: HttpClient, public board: BoardService, public fb: FormBuilder) {

    this.toppings = fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false
    });

    this.board.listTask('60db330c728da31738b54b4a').subscribe(
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
    )

  }

  ngOnInit(): void {

  }

  drop(e: any) {
    console.log('ok!', e)

    moveItemInArray(this.tasks, e.previousIndex, e.currentIndex);



  }

}
