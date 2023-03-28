import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  picUrl: string = '';
  name: string = '';
  user: any;
  isAdmin ="none";
  //data: any;
  constructor(private service: UserServiceService) {
    this.user = service.getUser();
  }

  ngOnInit(): void {
    // this.data = localStorage.getItem('loggedUser');
    // this.name = JSON.parse(this.data).firstname +" "+ JSON.parse(this.data).lastname;
    // this.picUrl = JSON.parse(this.data).profilePic;

    this.name = this.user.firstname +" "+ this.user.lastname;
    this.picUrl = this.user.profilePic;
    let adminEmailArray = JSON.parse(localStorage.getItem("admin") || "[]"); 
    //console.log(adminEmailArray);
    for (let i = 0; i < adminEmailArray.length; i++) {
      if (adminEmailArray[i] == this.user.email) {
        this.isAdmin = "inline";
      }
    }


    // this.user.changedisplayphoto$.subscribe(
    //   (message: string) => (this.picUrl = message)
    //   );

  }

}
