import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SkyscannerService {

  async searchFlights(): Promise<any> {
    const options = {
      method: 'POST',
      url: 'https://skyscanner-api.p.rapidapi.com/v3/flights/live/search/create',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'c868494e56mshe51b3980a772538p18dca4jsnb6253af150e2',
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
