import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Announcement } from '../announcement';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: any;
  fileUrl: string = '';
  files: Array<Object> = [];
  data: any;
  successAlert = false;
  fileName = '';
  file: string = '';
  message: string = '';
  announcements: Array<Announcement> = [];
  array: Array<string> = [];
  
  constructor(service: UserServiceService) { 
    this.user = service.getUser();
   
    this.announcements = JSON.parse(sessionStorage.getItem("announcements") || "[]");

  }

  ngOnInit(): void {
    this.files = this.user.files;
  }

  fileupload = new FormGroup({
    files: new FormControl()
  });


  get FilesUploaded(): FormControl {
    return this.fileupload.get("files") as FormControl;
  }

  onSelectFile(e: any) {
    let fileType = e.target.files[0].type;
    console.log(fileType);
    if (fileType.match(/image\/*/) || fileType.match(/msword/) || fileType.match(/pdf/) || fileType.match(/vnd.ms-excel/) || fileType.match(/text/)) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.file = (e.target.files[0]).name;
      reader.onload = (event: any) => {
        this.fileUrl = event.target.result;
      }
    } else {
      window.alert("Only Doc, Excel, Pdf, image files are accepted");
      this.fileupload.reset();
    }
  }


  uploadFile() {
    console.log(this.fileUrl);
    this.fileName = this.file;
    var upload = { name: this.fileName, url: this.fileUrl };
    Object.assign(upload);
    this.files.push(upload);
    console.log(this.files);

  
    localStorage.setItem(this.user.email, JSON.stringify(this.user));
    localStorage.setItem('loggedUser', JSON.stringify(this.user));
    this.successAlert = true;
    this.message = "File uploaded successfully"
  }
  
  onDelete() {
    this.files.pop();
    localStorage.setItem(this.user.email, JSON.stringify(this.user));
    localStorage.setItem('loggedUser', JSON.stringify(this.user));
    this.fileName = '';
    this.successAlert = true;
    this.message = "File Deleted Successfully";
  }

  dismissAnnouncement(i:number) {
    var id = JSON.stringify(this.announcements[i].id);
    this.announcements.splice(i, 1);
    console.log(this.announcements);
    sessionStorage.setItem("announcements", JSON.stringify(this.announcements));
  }


}

