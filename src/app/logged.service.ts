import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  data: any;

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  mobile: number = 0;
  gender: string = '';
  password: string = '';
  profilePic: string = '';

  constructor() { 
    this.data = localStorage.getItem('loggedUser');
    this.firstName = JSON.parse(this.data).firstname +" "+ JSON.parse(this.data).lastname;
    this.profilePic = JSON.parse(this.data).profilePic;
  }
}
