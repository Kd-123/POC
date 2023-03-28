import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Announcement } from './announcement';
import { Observable } from 'rxjs';
import { userDetails } from './userDetails';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: string = "https://63ec93c7be929df00cadb22d.mockapi.io/api/Announcement";
  baseURL2: string = "https://63ec93c7be929df00cadb22d.mockapi.io/api/User";
  
  constructor(private http: HttpClient) { }

  addAnnouncement(a: Announcement): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(a);
    console.log(body)
    return this.http.post(this.baseURL, body, { 'headers': headers })
  }

  public getPeople() {
    return this.http.get("https://swapi.dev/api/people/");
  }

  public getVehicles() {
    return this.http.get("https://swapi.dev/api/vehicles/");
  }

  public getUniversities() {
    // if (this.httpClient.get("http://localhost:3000/fetchUniversity/" + this.country)) {
    //   return null;
    // }
    // this.country = this.countryService.getCountryName();
    return this.http.get("http://localhost:3000/fetchUniversity/India");
  }

  public getAnnouncement() {
    return this.http.get("https://63ec93c7be929df00cadb22d.mockapi.io/api/Announcement");
  }

  deleteAnnouncement(id: number): Observable<unknown> {
    const url = `${this.baseURL}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url)
  }

  addUser(u: userDetails): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(u);
    console.log(body)
    return this.http.post(this.baseURL2, body, { 'headers': headers })
  }

  updateAnnouncement(id: number, a: Announcement): Observable<Announcement> {
    const url = `${this.baseURL}/${id}`;
    return this.http.put<Announcement>(url, a)
  }
}
