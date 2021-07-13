import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})
export class SaveTaskComponent implements OnInit {

  public taskData: any;
  public errorMessage: String;
  public selectedFile: any;
  public id: any;

  constructor(private tasksService: TasksService, private router: Router, private activateRoute: ActivatedRoute) {
    this.id = this.activateRoute.snapshot.params.id;
    this.taskData = { board: this.id };
    this.errorMessage = '';
    this.selectedFile = null;

  }

  ngOnInit(): void { }

  uploadImg(event: any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    console.log("el id es ", this.id);
    
  }

  addTaskImg() {
    if (!this.taskData.name || !this.taskData.description) {
      console.log('Failed process: Incomplete data');
      this.errorMessage = 'Failed process: Incomplete data';
      this.closeAlert();

    } else {

      const data = new FormData();
      data.append('board', this.id);
      data.append('image', this.selectedFile);
      data.append('name', this.taskData.name);
      data.append('description', this.taskData.description);

      this.tasksService.addTaskImg(data).subscribe(
        (res) => {
          this.router.navigate(['/listTasks', this.id]);

        },
        (err) => {
          console.log(err.error);
          this.errorMessage = err.error;
          this.closeAlert();

        }
      );

    }
  }

  closeAlert() {
    setTimeout(() => {

      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
  }

}

