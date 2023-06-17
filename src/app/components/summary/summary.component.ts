import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { SummaryService } from 'src/app/services/summary.service';
import {
  faHome,
  faCalendarAlt,
  faMapMarker,
  faUser,
  faSuitcase,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { WeatherData } from '../../interfaces/weather-data';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  //Weather Api variables
  feelsLike: string | null = null;
  weatherData: WeatherData | undefined;

  //Selected Variables
  selectedOrigin: string | null = null;
  selectedDestination: string | null = null;
  selectedDate: Date | null = null;
  selectedPassengerCount: number = 0;
  selectedLuggageOption: string | null = null;

  //Ticket price
  ticketPrice: number = 530;
  selectedCurrency: string = 'PLN';
  currencySymbol: string = 'zł';

  //Icons
  originIcon = faHome;
  dateIcon = faCalendarAlt;
  destinationIcon = faMapMarker;
  passengersIcon = faUser;
  luggageIcon = faSuitcase;
  infoIcon = faInfoCircle;

  constructor(
    private summaryService: SummaryService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.selectedOrigin = this.summaryService.selectedOrigin;
    this.selectedDestination = this.summaryService.selectedDestination;
    this.selectedDate = this.summaryService.selectedDate;
    this.selectedPassengerCount = this.summaryService.selectedPassengerCount;
    this.selectedLuggageOption = this.summaryService.selectedLuggageOption;
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
}


  // getWeatherData(): void {
  //   if (this.selectedDestination) {
  //     this.weatherService.getWeather(this.selectedDestination).subscribe((data: any) => {
  //       try {
  //         this.weatherData = JSON.parse(data);
  //         console.log(this.weatherData, "data")
  //         if (this.weatherData && this.weatherData.main && this.weatherData.main.temp) {
  //           const temperatureInCelsius = this.weatherData.main.temp - 273.15; // Przeliczenie na stopnie Celsiusza
  //           this.feelsLike = temperatureInCelsius.toFixed(1).toString();
  //           console.log("temperature", this.weatherData.main.feels_like)
  //         }
  //       } catch (error) {
  //         console.error("Błąd parsowania danych JSON:", error);
  //       }
  //     });
  //   }
  // }


