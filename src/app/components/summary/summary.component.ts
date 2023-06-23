import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/services/summary.service';
import { faHome, faCalendarAlt, faMapMarker, faUser, faSuitcase, faInfoCircle, faSun, faMoon, faCloud } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment.prod';
import { SkyscannerService } from 'src/app/services/skyscanner.service';
import axios from 'axios';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  weatherData: any;

  selectedOrigin: string | null = null;
  selectedDestination: string | null = null;
  selectedDate: Date | null = null;
  selectedPassengerCount: number = 0;
  selectedLuggageOption: string | null = null;

  ticketPrice: number = 0;
  selectedCurrency: string = 'PLN';
  currencySymbol: string = 'zł';

  originIcon = faHome;
  dateIcon = faCalendarAlt;
  destinationIcon = faMapMarker;
  passengersIcon = faUser;
  luggageIcon = faSuitcase;
  infoIcon = faInfoCircle;
  sunIcon = faSun;
  moonIcon = faMoon;
  cloudIcon = faCloud;

  constructor(private summaryService: SummaryService, private skyscannerService: SkyscannerService) {}

  ngOnInit(): void {
    this.selectedOrigin = this.summaryService.selectedOrigin;
    this.selectedDestination = this.summaryService.selectedDestination;
    this.selectedDate = this.summaryService.selectedDate;
    this.selectedPassengerCount = this.summaryService.selectedPassengerCount;
    this.selectedLuggageOption = this.summaryService.selectedLuggageOption;
    this.weatherData = {
      main: {},
      isDay: true,
    };
    if (this.selectedDestination !== null) {
      this.getWeatherData(this.selectedDestination);
    }
    this.fetchCheapestPrice()
  }


  formatSelectedDate(): string {
    if (this.selectedDate) {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      return this.selectedDate.toLocaleDateString(undefined, options);
    }
    return 'Date';
  }

  setCurrency(currency: string, symbol: string): void {
    this.selectedCurrency = currency;
    this.currencySymbol = symbol;
  }



  setSelectedDate(date: Date) {
    this.selectedDate = date;
  }

  getWeatherData(selectedDestination: string): void {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedDestination}&appid=${environment.apiKeyWeather}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setWeatherData(data);
      });
  }

  setWeatherData(data: any): void {
    this.weatherData = data;
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weatherData.isDay = currentDate.getTime() < sunsetTime.getTime();
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    // this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    // this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    // this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);
  }


  //Search for cheapest flight ticket

  getConvertedPrice(): number {
    const exchangeRates: { [key: string]: number } = {
      PLN: 1,
      EUR: 0.23,
      USD: 0.27,
    };
    if (exchangeRates[this.selectedCurrency]) {
      return this.ticketPrice * exchangeRates[this.selectedCurrency];
    }
    return this.ticketPrice;
  }

  async fetchCheapestPrice(): Promise<any> {

    let selectedYear: number = this.selectedDate ? this.selectedDate?.getFullYear() : 0;
    let selectedMonth: number = this.selectedDate ? (this.selectedDate?.getMonth()+1) : 0;
    let selectedDay: number = this.selectedDate ? (this.selectedDate?.getUTCDate()+1) : 0;

    const options = {
      method: 'POST',
      url: 'https://skyscanner-api.p.rapidapi.com/v3/flights/live/search/create',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': `${environment.apiKeySkyscanner}`,
        'X-RapidAPI-Host': 'skyscanner-api.p.rapidapi.com'
      },
      data: {
        query: {
          market: 'PL',
          locale: 'pl-PL',
          currency: 'PLN',
          queryLegs: [
            {
              originPlaceId: { iata: this.summaryService.selectedOriginCode },
              destinationPlaceId: { iata: this.summaryService.selectedDestinationCode },
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
      return this.ticketPrice = extractCheapestPrice(response);

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}



