import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { customValidator } from '../customValidator';
import { uploadedFile } from '../files';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';
import { userDetails } from '../userDetails';


@Component({
selector: 'app-registration-page',
templateUrl: './registration-page.component.html',
styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
repeatPass: string = "none";
data: any;
users: Array<string> = [];
  user: any;
  files: Array<uploadedFile> = [];
  
  dangerAlert = false;
  successAlert = false;
  repeatPasswordCheck = 'none';

userNum: number = 0;

constructor(private EncrDecr: EncrDecrServiceService,private api: ApiService) { }

ngOnInit(): void {
}
registration = new FormGroup({
firstname: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern('[A-Za-z]*')]),//* means for all the other characters in that string
lastname: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern('[A-Za-z]*')]),
  email: new FormControl("", [Validators.required, Validators.email]),
mobile: new FormControl("",[Validators.required,Validators.pattern('[1-9]{1}[0-9]{9}')]),
gender: new FormControl(""),
pwd: new FormControl("",[Validators.required,Validators.minLength(8),Validators.maxLength(15)]),
rpwd: new FormControl("", Validators.required),
  profilePic: new FormControl("assets/images/default.jpg"),
  files: new FormControl(this.files)
}, 
  {
    validators: [customValidator.MustMatch]
  }
); 

RegisterSubmited() {
  if (this.Pwd.value == this.Rpwd.value) {
  
  this.repeatPass = "none";
  delete this.registration.value.rpwd;
  ///encrypt password
  var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.Pwd.value);
    this.registration.value.pwd = encrypted;
    this.user = this.registration.value;

  this.api.addAnnouncement(this.user).subscribe(a => this.user);
  
  
} else {
  this.repeatPass = "inline";
}
}
  
  
checkRepeatPassword() {
  if (this.Pwd.value == this.Rpwd.value) {
    this.repeatPasswordCheck = 'none';
  } else {
    this.repeatPasswordCheck = 'inline';
    this.registration.setErrors({ 'invalid': true });
  }
}

get FirstName(): FormControl {
return this.registration.get("firstname") as FormControl;
}

get LastName(): FormControl {
return this.registration.get("lastname") as FormControl;
}

get Email(): FormControl {
return this.registration.get("email") as FormControl;
}

get Mobile(): FormControl {
return this.registration.get("mobile") as FormControl;
}

get Gender(): FormControl {
return this.registration.get("gender") as FormControl;
}

get Pwd(): FormControl {
return this.registration.get("pwd") as FormControl;
}

get Rpwd(): FormControl {
return this.registration.get("rpwd") as FormControl;
}

}