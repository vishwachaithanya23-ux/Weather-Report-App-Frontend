import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private base = '/api';

  constructor(private http: HttpClient) {}

  //http://localhost:8080/api/weather/current?lat=17.3850&lon=78.4867&units=metric  --working properly

  getCurrentWeather(lat: number, lon: number): Observable<any> {
  return this.http.get<any>(`http://localhost:8080/api/weather/current?lat=${lat}&lon=${lon}`);
  }

  //http://localhost:8080/api/weather/forecast?lat=17.3850&lon=78.4867&units=metric  --working properly

  getForecast(lat: number, lon: number): Observable<any> {
  return this.http.get<any>(`http://localhost:8080/api/weather/forecast?lat=${lat}&lon=${lon}&units=metric`);
  }
  

  //http://localhost:8080/api/weather/search?q=London

  searchCity(query: string): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8080/api/weather/search?q=${query}`);
}
}
