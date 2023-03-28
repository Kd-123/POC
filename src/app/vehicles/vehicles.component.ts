import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  searchTerm!: string;
  page = 1;
  pageSize = 4;
  collectionSize: number | undefined;
  currentRate = 8;
  p: number = 1;

  vehiclesList: any;
  data: Array<Vehicle> = [];
  dataSearch: Array<Vehicle> = [];

  constructor(private apiService: ApiService) { }
  

  ngOnInit(): void {
    
    this.apiService.getVehicles().subscribe((d) => {
      console.log(d);
      this.vehiclesList = d;
      this.data = this.vehiclesList.results;
      this.collectionSize = this.data.length;
      this.dataSearch = this.data;
      //console.log(this.factsList.data);
        console.log(this.data);
    })

  }

  search(value: string): void {
    this.dataSearch = this.data.filter((val) => val.name.toLowerCase().includes(value));
    this.collectionSize = this.dataSearch.length;
  }
}
