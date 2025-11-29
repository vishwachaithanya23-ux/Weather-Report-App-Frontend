import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-search-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-location.html',
  styleUrls: ['./search-location.css']
})
export class SearchLocationComponent {

  query: string = '';
  results: any[] = [];
  loading = false;
  showDropdown = false;

  @Output() locationSelected = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) {}

  onInput() {
    if (!this.query || this.query.length < 2) {
      this.results = [];
      this.showDropdown = false;
      return;
    }

    this.loading = true;
    this.weatherService.searchCity(this.query).subscribe({
      next: (res) => {
        this.results = res;
        this.loading = false;
        this.showDropdown = true;
      },
      error: () => {
        this.results = [];
        this.loading = false;
        this.showDropdown = true;
      }
    });
  }

  blurHandler() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  selectCity(city: any) {
    this.query = city.name;
    this.results = [];
    this.showDropdown = false;
    this.locationSelected.emit(city);
  }

  manualSearch() {
    this.onInput();
  }
}
