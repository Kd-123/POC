import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryNameService {

  country: string = "India";
  constructor() { }

  getCountryName() {
    return this.country;
  }
  setCountryName(country: string) {
    this.country = country;
  }
}
