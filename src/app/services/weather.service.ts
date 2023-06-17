import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiWeatherKey: string = "daa1a4651a153ecac32dd9a2a31cc94e"

  

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiWeatherKey}`;
    return this.http.get(apiUrl);
  }
}


