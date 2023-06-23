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

  // setSelectedDate(date: Date) {
  //   this.selectedDate = date;
  // }

  apiKeySkyscanner: string = environment.apiKeySkyscanner;




  async fetchCheapestPrice(): Promise<any> {

    let selectedYear: number = this.selectedDate ? this.selectedDate?.getFullYear() : 0;
    let selectedMonth: number = this.selectedDate ? this.selectedDate?.getFullYear() : 0;
    let selectedDay: number = this.selectedDate ? this.selectedDate?.getFullYear() : 0;

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
          market: 'PL',
          locale: 'pl-PL',
          currency: 'PLN',
          queryLegs: [
            {
              originPlaceId: { iata: this.selectedOrigin },
              destinationPlaceId: { iata: this.selectedDestination },
              date: {
                year: selectedYear,
                month: selectedMonth,
                day: selectedDay
              }
            }
          ],
          cabinClass: 'CABIN_CLASS_ECONOMY',
          adults: this.selectedPassengerCount,
          childrenAges: [3, 9]
        }
      }
    };

    try {
      const response = await axios.request(options);

      function extractCheapestPrice(data: any): number {
        const itineraryId = data.content.sortingOptions.cheapest[0].itineraryId;
        const itineraryObject = data.content.results.itineraries[itineraryId];
        return parseInt(itineraryObject.pricingOptions[0].price.amount)
      }

      return extractCheapestPrice(response);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
