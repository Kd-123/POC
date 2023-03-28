
import { Announcement } from '../announcement';
import { formatDate } from '@angular/common';
import { Component, OnInit ,Inject,
  LOCALE_ID} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  announcements:any[] = JSON.parse(localStorage.getItem("announcements") || "[]");
  //array: Array<number> = [];


  constructor(@Inject(LOCALE_ID) public locale: string) { 
    console.log(this.announcements, this.announcements.length); 
  

    let today = new Date(formatDate(new Date(), 'yyyy-MM-dd', this.locale));
   
    for (var i = this.announcements.length-1 ; i >= 0; i--){
      
      let sdate = new Date(this.announcements[i].startdate);
      let edate = new Date(this.announcements[i].enddate);

      
      if (today < sdate || today > edate) {
        console.log(this.announcements[i])
        this.announcements.splice(i, 1);

      }
      
    }
    console.log(this.announcements);
    sessionStorage.setItem("announcements", JSON.stringify(this.announcements));
  }

  ngOnInit(): void {
  }

  // removeObjectWithId(arr: any[], id: number) {
  //   const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  //   arr.splice(objWithIdIndex, 1);
  //   return arr;
  // }

}
