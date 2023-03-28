import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncrDecrServiceService } from '../services/encr-decr-service.service';


@Component({
selector: 'app-login-page',
templateUrl: './login-page.component.html',
styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  data: any;
  pass: string = "none";
  dangerAlert = false;

constructor(private router: Router,private EncrDecr: EncrDecrServiceService) { }

ngOnInit(): void {
}

login = new FormGroup({
  emailid: new FormControl("", [Validators.required, Validators.email]),
  password: new FormControl("", Validators.required)
});

  
  LoginSubmitted() {
    
    this.data = localStorage.getItem(this.Email.value);
    let pwd = (this.data) ? JSON.parse(this.data).pwd : null;
    var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', pwd);

    if (this.data && this.Password.value == decrypted) {
      this.pass = "none";
      this.router.navigate(['/dashboard']);
      localStorage.setItem('loggedUser', this.data);
    } else {
      // this.pass = "inline";
      this.dangerAlert = true;
    }
    
  }
  
get Email(): FormControl {
  return this.login.get("emailid") as FormControl;
  }
  
get Password(): FormControl {
  return this.login.get("password") as FormControl;
  }

}
