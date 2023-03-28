import { Component, OnInit } from '@angular/core';
import { People } from '../people';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  peopleList: any;
  data: Array<People> = [];
  p: number = 1;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    console.log("hello")
    this.apiService.getPeople().subscribe((d)=>{
      console.log(d);
      this.peopleList = d;
      this.data = this.peopleList.results;
    });

  }

}
