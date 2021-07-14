import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userData: any;
  public selectedFile: any;
  public readerImg:any;

  constructor(private auth: AuthService) { 
    this.userData = {};
    this.readerImg = '/assets/imgs/profile.jpg';
  }

  ngOnInit(): void {
    this.userData = this.auth.getUserData();
    console.log(this.userData);
    
    // if(!this.userData.img) this.userData.img = "https://via.placeholder.com/50"
    if(this.userData.status) this.userData.status = "Activo"
    let text = this.userData.name;
    // this.userData.name = text.charAt(0).toUpperCase() + text.slice(1);
  }


  saveChanges() {
    // this.edition = false
    // this.tasksService.updateTask(this.taskData).subscribe(
    //   res => {
    //     console.log(res);
    //     this.changeImg();
    //     this.loadTask();

    //   }
    // )
  }

  cancelChanges() {
    // this.edition = false
    // this.currentImg(this.taskId);
  }

  currentImg(id: string) {
    // this.tasksService.showImg('tasks', id).subscribe(
    //   res => {
    //     console.log(res);
    //     const reader = new FileReader();
    //     reader.readAsDataURL(res); // convierte el blob a base64 y llama a onload
    //     reader.onload = () => this.readerImg = reader.result; // URL de datos
    //   }
    // )
  }
  uploadImg(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {

      this.selectedFile = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => this.readerImg = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }

    // this.flagImg = true;

  }

  changeImg() {
    // const data = new FormData();

    // if (this.flagImg) {

    //   data.append('image', this.selectedFile);
    //   this.flagImg = false;
    // } else {
    //   data.append('image', '');
    // }


    // this.tasksService.updateImg('tasks', this.taskId, data).subscribe(
    //   res => {
    //     console.log(res);

    //   }
    // );
    // this.edition = false;

  }

  deleteTask(id: any) {
    // this.tasksService.deleteTask(id).subscribe(
    //   res => {

    //     this.loadTask();

    //   }
    // )

  }

  deleteImg() {
    this.readerImg = '/assets/imgs/no-image.jpg';
  }

}
