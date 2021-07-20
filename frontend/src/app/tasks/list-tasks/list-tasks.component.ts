import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

  tasks: any[] = [];
  id: String;
  taskId: any;
  taskData: any;
  edition: boolean;
  selectedFile: any;
  flagImg: boolean;
  taskImg: string;
  readerImg: any;

  constructor(public tasksService: TasksService, private router: Router, private activateRoute: ActivatedRoute) {

    this.id = this.activateRoute.snapshot.params.id;
    this.taskId = '';
    this.taskImg = '';
    this.taskData = {}
    this.edition = false;
    this.flagImg = false;
    this.selectedFile = null;

    this.loadTask();
  }

  ngOnInit(): void {
    console.log("el id es ", this.id);
  }

  loadTask() {
    this.tasksService.listTask(this.id).subscribe(
      (res: any) => {
        this.tasks = res.tasks;
      });
  }

  changeStatus(task: any, status: string) {

    task.status = status;

    this.tasksService.updateTask(task).subscribe(
      res => {
        task.status = status;
        console.log(task.status);

      }
    );

  }
  createTask() {
    this.router.navigate(['/addTask', this.id]);
  }

  editTask(task: any, taskId: any) {
    const { name, description, _id } = task;

    if (taskId == _id) {
      this.edition = true;
    } else {
      this.edition = false;
    }

    if (this.edition && task._id == taskId) {
      this.currentImg(_id);
    } else {
      this.readerImg = null
    }

    this.taskData = { _id, name, description }

    this.taskId = _id;

  }

  saveChanges() {
    this.edition = false
    this.tasksService.updateTask(this.taskData).subscribe(
      res => {
        console.log(res);
        this.changeImg();
        this.refreshPage();
      }
    )
  }

  cancelChanges() {
    this.edition = false
    this.currentImg(this.taskId);
  }

  currentImg(id: string) {
    this.tasksService.showImg('tasks', id).subscribe(
      res => {
        console.log(res);
        const reader = new FileReader();
        reader.readAsDataURL(res); // convierte el blob a base64 y llama a onload
        reader.onload = () => this.readerImg = reader.result; // URL de datos
      }
    )
  }
  uploadImg(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {

      this.selectedFile = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => this.readerImg = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }

    this.flagImg = true;

  }

  changeImg() {
    const data = new FormData();

    if (this.flagImg) {

      data.append('image', this.selectedFile);
      this.flagImg = false;
    } else {
      data.append('image', '');
    }


    this.tasksService.updateImg('tasks', this.taskId, data).subscribe(
      res => {
        console.log(res);

      }
    );
    this.edition = false;

  }

  deleteTask(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.tasksService.deleteTask(id).subscribe(
          res => {
            Swal.fire('Task has been deleted');
            this.loadTask();
          }
        );
      }
    });
  }

  deleteImg() {
    this.readerImg = '/assets/imgs/no-image.jpg';
  }

  refreshPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
