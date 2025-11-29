import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { TempGraphComponent } from '../temp-graph/temp-graph';

@Component({
  selector: 'app-forecast-weather',
  standalone: true,
  imports: [CommonModule, TempGraphComponent],
  templateUrl: './forecast-weather.html',
  styleUrls: ['./forecast-weather.css']
})
export class ForecastWeatherComponent implements OnChanges {

  @Input() lat!: number;
  @Input() lon!: number;

  forecast: any = null; // { daily: [...] }
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.lat && this.lon) {
      this.fetch();
    }
  }

  fetch() {
    this.loading = true;
    this.error = '';

    this.weatherService.getForecast(this.lat, this.lon).subscribe({
      next: (data) => {

        const dailyMap: any = {};

        // Convert OpenWeather list[] -> daily[]
        data.list.forEach((item: any) => {
          const date = item.dt_txt.split(' ')[0];

          if (!dailyMap[date]) {
            dailyMap[date] = {
              dt: item.dt,
              weather: item.weather,
              temp: {
                min: item.main.temp_min,
                max: item.main.temp_max
              }
            };
          } else {
            dailyMap[date].temp.min = Math.min(dailyMap[date].temp.min, item.main.temp_min);
            dailyMap[date].temp.max = Math.max(dailyMap[date].temp.max, item.main.temp_max);
          }
        });

        this.forecast = {
          daily: Object.values(dailyMap).slice(0, 5)
        };

        this.loading = false;
      },

      error: (err) => {
        console.error(err);
        this.error = 'Failed to load forecast';
        this.loading = false;
      }
    });
  }
}
