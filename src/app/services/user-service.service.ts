import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  data: any;

  constructor() { 
    this.data = JSON.parse(localStorage.getItem('loggedUser') || '');
  }

  getUser() {
    return this.data;
  }

  // private changepic = new Subject<string>();
  // changedisplayphoto$ = this.changepic.asObservable();
  // changedisplay(message: string) {
  // this.changepic.next(message);
  // }
}
