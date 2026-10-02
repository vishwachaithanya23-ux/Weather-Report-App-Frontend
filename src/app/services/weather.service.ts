import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private base = `${environment.apiUrl}/api/weather`;

  constructor(private http: HttpClient) {}

  getCurrentWeather(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(`${this.base}/current?lat=${lat}&lon=${lon}`);
  }

  getForecast(lat: number, lon: number): Observable<any> {
    return this.http.get<any>(`${this.base}/forecast?lat=${lat}&lon=${lon}&units=metric`);
  }

  searchCity(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/search?q=${encodeURIComponent(query)}`);
  }
}