import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchLocationComponent } from './search-location/search-location';
import { CurrentWeatherComponent } from './current-weather/current-weather';
import { ForecastWeatherComponent } from './forecast-weather/forecast-weather';
import { MapViewComponent } from './map-view/map-view';
import { ClockWidgetComponent } from './clock-widget/clock-widget';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchLocationComponent,
    CurrentWeatherComponent,
    ForecastWeatherComponent,
    MapViewComponent,
    ClockWidgetComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  selectedLat: number | null = null;
  selectedLon: number | null = null;
  showDetails = false;
  isDark = false;

  constructor() {
    // Load dark mode from localStorage
    const d = localStorage.getItem('wdark');
    this.isDark = d === 'true';
    this.updateDarkClass();
  }

  onLocationSelected(coords: { lat: number; lon: number }) {
    this.selectedLat = coords.lat;
    this.selectedLon = coords.lon;
    this.showDetails = true;
  }

  detectLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(pos => {
      this.selectedLat = pos.coords.latitude;
      this.selectedLon = pos.coords.longitude;
      this.showDetails = true;
    }, err => {
      console.error(err);
      alert('Unable to detect location');
    });
  }

  toggleDark() {
    this.isDark = !this.isDark;
    localStorage.setItem('wdark', String(this.isDark));
    this.updateDarkClass();
  }

  private updateDarkClass() {
    document.body.classList.toggle('dark', this.isDark);
  }
}
