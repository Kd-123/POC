import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router'
import { EncrDecrServiceService } from '../services/encr-decr-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  //oldPass: boolean;
  user: any;
  oldPasswordWrong = 'none'; 
  repeatPasswordCheck = 'none';
  disable = true;
  successAlert = false;

  constructor(service: UserServiceService,private router: Router,private EncrDecr: EncrDecrServiceService) {
    this.user = service.getUser();
    //console.log(this.user.firstname);
  }

  ngOnInit() {
  }
  changePass = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]),
    repeatPassword: new FormControl('',Validators.required)
  });
 

  changePassword() { 
    var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', this.NewPassword.value);

    this.user.pwd = encrypted;
    localStorage.setItem(this.user.email, JSON.stringify(this.user));
    localStorage.setItem('loggedUser',JSON.stringify(this.user) );
    this.successAlert = true;
    // this.router.navigate(['/login']);
  }

  checkOldPassword() {
    var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.user.pwd);
    if (decrypted == this.OldPassword.value) {
      this.oldPasswordWrong = 'none';
    } else {
      this.oldPasswordWrong = 'inline';
      this.changePass.setErrors({ 'invalid': true });
    }
      
  }

  checkRepeatPassword() {
    if (this.NewPassword.value == this.RepeatPassword.value) {
      this.repeatPasswordCheck = 'none';
    } else {
      this.repeatPasswordCheck = 'inline';
      this.changePass.setErrors({ 'invalid': true });
    }
  }

  // formDisable() {
  //   if (this.repeatPasswordCheck == 'inline' || this.oldPasswordWrong == 'inline') {
  //     this.changePass.setErrors({ 'invalid': true });
  //   }
    
  // }
  
  
  get OldPassword(): FormControl {
    return this.changePass.get("oldPassword") as FormControl;
  }

  get NewPassword(): FormControl {
    return this.changePass.get("newPassword") as FormControl;
  }

  get RepeatPassword(): FormControl {
    return this.changePass.get("repeatPassword") as FormControl;
  }
}

