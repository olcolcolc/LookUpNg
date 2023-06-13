import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from '../interfaces/destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private apiUrl = 'assets/api/destination.json';

  constructor(private http: HttpClient) { }

  getDestinations(): Observable<Destination[]> {
    console.log('Fetching destinations...');
    return this.http.get<Destination[]>(this.apiUrl);
  }
}
