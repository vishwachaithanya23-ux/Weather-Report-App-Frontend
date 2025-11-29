import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common'; // <-- import JsonPipe

@Component({
  selector: 'app-current-weather',
  standalone: true, // <-- make sure it’s standalone if needed
  imports: [CommonModule], // <-- add JsonPipe here
  templateUrl: './current-weather.html',
  styleUrls: ['./current-weather.css']
})
export class CurrentWeatherComponent implements OnChanges {
  @Input() lat!: number;
  @Input() lon!: number;

  currentWeather: any = null;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.lat != null && this.lon != null) {
      this.fetchCurrentWeather();
    }
  }

  fetchCurrentWeather() {
    this.loading = true;
    this.error = '';
    this.weatherService.getCurrentWeather(this.lat, this.lon).subscribe({
      next: (data) => {
        this.currentWeather = data;
        this.loading = false;
      },
      error: (e) => {
        console.error(e);
        this.error = 'Failed to load current weather';
        this.loading = false;
      }
    });
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  isPrimitive(value: any): boolean {
    return !this.isObject(value);
  }
}
