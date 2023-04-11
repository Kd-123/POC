import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RegistrationLoginPage';

  admin = ["kanishka@gmail.com"];


  constructor() {
    localStorage.setItem("admin", JSON.stringify(this.admin));
  }

}
