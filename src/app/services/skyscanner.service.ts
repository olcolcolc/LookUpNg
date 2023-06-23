import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SkyscannerService {

  selectedOrigin: string | null = null;
  selectedDestination: string | null = null;
  selectedDate: Date | null = null;
  selectedPassengerCount: number = 0;
  selectedLuggageOption: string | null = null;

  setSelectedDate(date: Date) {
    this.selectedDate = date;
  }
  apiKeySkyscanner: string = environment.apiKeySkyscanner;


  async searchFlights(): Promise<any> {
    const options = {
      method: 'POST',
      url: 'https://skyscanner-api.p.rapidapi.com/v3/flights/live/search/create',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': `${this.apiKeySkyscanner}`,
        'X-RapidAPI-Host': 'skyscanner-api.p.rapidapi.com'
      },
      data: {
        query: {
          market: 'UK',
          locale: 'en-GB',
          currency: 'EUR',
          queryLegs: [
            {
              originPlaceId: { iata: 'LHR' },
              destinationPlaceId: { iata: 'DXB' },
              date: {
                year: 2023,
                month: 9,
                day: 20
              }
            }
          ],
          cabinClass: 'CABIN_CLASS_ECONOMY',
          adults: 2,
          childrenAges: [3, 9]
        }
      }
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
