import { Component, OnInit } from '@angular/core';
import { uploadedFile } from '../files';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-uplaoded-files',
  templateUrl: './uplaoded-files.component.html',
  styleUrls: ['./uplaoded-files.component.css']
})
export class UplaodedFilesComponent implements OnInit {

  user: any;
  
  files: Array<uploadedFile> = [];
  constructor(service: UserServiceService) { 
    this.user = service.getUser();
  }

  ngOnInit(): void {
    this.files = this.user.files;
    console.log(this.files);
  }
  
  onDelete(name:string) {
    for (let i = 0; i < this.files.length; i++){
      if (this.files[i].name === name) {
        this.files.splice(i, 1);
      }
    }
    this.user.files = this.files;

    localStorage.setItem(this.user.email, JSON.stringify(this.user));
    localStorage.setItem('loggedUser', JSON.stringify(this.user));

  }

  preview() {
    
  }

}
