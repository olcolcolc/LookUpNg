import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey: string = 'YOUR_API_KEY'; // Klucz API (jeśli wymagany)

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const apiUrl = `https://api.weatherprovider.com/weather?city=${city}&apiKey=${this.apiKey}`;
    return this.http.get(apiUrl);
  }
}
