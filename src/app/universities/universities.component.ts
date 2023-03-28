import { Component, OnInit, Output } from '@angular/core';
import { all } from 'axios';
import { ApiService } from '../api.service';
import { CountryNameService } from '../country-name.service';
import { University } from '../university';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css']
})
export class UniversitiesComponent implements OnInit {

  searchTerm = '';
  uniList: any;
  //data: Array<People> = [];
  p: number = 1;

  val: string = "";

  state: boolean = false;
  country: string = ""

  countries: University[] = [];
  allCountries: University[] = [];

  data: Array<University> = [];
  pageSize = 6;
  pageSizes = [6, 12, 18];

  loading = false;



  constructor(public apiService: ApiService, private countryService: CountryNameService) {
    this.country = countryService.getCountryName();
  }

  ngOnInit(): void {
    //this.apiService.setCountry(this.val);
    console.log("hello");

    this.loading = true;
    this.fetchAPI();
  }



  onSelected(value: string): void {
    this.loading = true;
    this.countryService.setCountryName(value);
    this.apiService.getUniversities();
    // this.ngOnInit();
    this.fetchAPI();
    
  }

  search(value: string): void {
    //if(value==""){this.countries=this.allCountries;}

    this.countries = this.allCountries.filter(
      (val) => val.name.toLowerCase().includes(value.toLowerCase().trim())



      // function (val, i, array) {
      //   let arrayelement = val.name.toLowerCase()
      //   return arrayelement.includes(value.toLowerCase())
      // }

    );
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
  }

  onSort(val: any) {

    if (val == 'A') {
      this.countries = this.countries.sort((a, b) => a.name.localeCompare(b.name));

    }
    else {
      this.countries = this.countries.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.countries = this.removeDuplicates(this.countries);

  }

  removeDuplicates(arr: Array<University>) {
    return arr.filter((item: any,
      index: any) => arr.indexOf(item) === index);
  }

  fetchAPI() {
    this.apiService.getUniversities()?.subscribe((d) => {
      console.log(d);
      this.uniList = d;
      console.log("hello");
      console.log(this.uniList);
      this.data = Array.from(this.uniList.reduce((m: { set: (arg0: any, arg1: any) => any; }, t: { name: any; }) => m.set(t.name, t), new Map()).values());

      this.countries = this.data;
      this.allCountries = this.countries;
      this.loading = false;
      //this.state = this.data[0].state_province;
    });
  }
  
}

