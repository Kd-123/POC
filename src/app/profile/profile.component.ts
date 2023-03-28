import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { uploadedFile } from '../files';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  profPic: string = '';

  @Output() picChanged: EventEmitter<string> = new EventEmitter();

  //data: any;
  user: any;

  fName: string = '';
  lName: string = "";
  emailId: string = "";
  mobileNum: number = 0;
  gen: string = '';
  
  pwd: string = '';
  rpwd: string = '';
  preview: string = '';
  image: string = '';
  files: Array<uploadedFile> = [];

  successAlert = false;
  dangerAlert = false;
  successPhoto = false;


  constructor(service: UserServiceService) { 
    this.user = service.getUser();
  }

  ngOnInit(): void {
    ////local storage data
    //this.data = localStorage.getItem('loggedUser');
    this.fName = this.user.firstname;
    this.lName = this.user.lastname;
    this.emailId = this.user.email;
    this.mobileNum = this.user.mobile;
    this.gen = this.user.gender;
    this.profPic = this.user.profilePic;
    this.pwd = this.user.pwd;
    this.rpwd = this.user.rpwd;
    this.preview = this.profPic;
    this.files = this.user.files;
     
  }

  ///form data
  editProfile = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern('[A-Za-z]*')]),//* means for all the other characters in that string
    lastname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern('[A-Za-z]*')]),
    email: new FormControl("", [Validators.required, Validators.email]),
    mobile: new FormControl("", [Validators.required, Validators.pattern('[1-9]{1}[0-9]{9}')]),
    gender: new FormControl(""),
    pwd: new FormControl(""),
    profilePic: new FormControl(""),
    files: new FormControl()
  });
  
  
  EditedProfile() {
    console.log(this.editProfile.value);
    // if email id is also changed- edit it in users array and delete the previous data 
    if (this.emailId != this.Email.value) {
      //edit users array
      let usr: Array<string> = JSON.parse(localStorage.getItem('users') || "[]");
      
      for (let i = 0; i < usr.length; i++) {
        if (usr.at(i) == this.emailId) {
          usr.splice(i, 1, this.Email.value);
        }
      }
      localStorage.setItem('users', JSON.stringify(usr));

      //delete previous data and enter new data
      localStorage.removeItem(this.emailId);

    }
    ///replace with the edited data
    this.editProfile.patchValue({
      pwd: this.pwd,
      profilePic: this.profPic,
      gender: this.gen,
      email: this.emailId,
      files: this.files
    });
    localStorage.setItem(this.Email.value, JSON.stringify(this.editProfile.value));
    localStorage.setItem('loggedUser', JSON.stringify(this.editProfile.value));
    this.successAlert = true;
  }
  
  changeDisplay() {
    this.fName = this.FirstName.value;
    this.lName = this.LastName.value;
    this.mobileNum = this.Mobile.value;
  }

  changedisplayphoto() {
    this.user.changedisplay(this.preview);
  }


  changePhoto() {
    console.log(this.profPic);
    this.profPic = this.preview;
    console.log(this.profPic);
    //localStorage.setItem('image', this.preview);
    //this.image = JSON.parse(localStorage.getItem('image') || '');
   // console.log(this.image);
    
    document.getElementById('imgProf')?.setAttribute('src', this.image);
   // console.log(document.getElementById('imgProf')?.getAttribute('src'))
    
    
    this.editProfile.setValue({
      profilePic: this.profPic,
      firstname: this.fName,
      lastname: this.lName,
      email: this.emailId,
      mobile: String(this.mobileNum),
      gender: this.gen,
      pwd: this.pwd,
      files:this.files
    })

    console.log(this.editProfile.value);


    localStorage.setItem(this.emailId, JSON.stringify(this.editProfile.value));
    localStorage.setItem('loggedUser', JSON.stringify(this.editProfile.value));
    this.picChanged.emit(this.profPic);
    this.successPhoto = true;
}


  onSelectPhoto(e: any) {
    let fileType = e.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.preview = event.target.result;
        localStorage.setItem('image', JSON.stringify(this.preview));
      }
    } else {
      window.alert("Select correct image type");
    }
  }

  
    get FirstName(): FormControl {
      return this.editProfile.get("firstname") as FormControl;
    }
      
      get LastName(): FormControl {
      return this.editProfile.get("lastname") as FormControl;
    }
      
      get Email(): FormControl {
      return this.editProfile.get("email") as FormControl;
    }
      
      get Mobile(): FormControl {
      return this.editProfile.get("mobile") as FormControl;
    }
      
      get Gender(): FormControl {
      return this.editProfile.get("gender") as FormControl;
    }
  
      get ProfilePic(): FormControl {
      return this.editProfile.get("profilePic") as FormControl;
    }

      
  }
