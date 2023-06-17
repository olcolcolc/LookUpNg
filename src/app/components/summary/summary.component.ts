import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/services/summary.service';
import { faHome, faCalendarAlt, faMapMarker, faUser, faSuitcase, faInfoCircle, faSun, faMoon, faCloud } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../enviroments/enviroment.prod';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  weatherData: any;
  apiKey: string = environment.apiKey;

  selectedOrigin: string | null = null;
  selectedDestination: string | null = null;
  selectedDate: Date | null = null;
  selectedPassengerCount: number = 0;
  selectedLuggageOption: string | null = null;

  ticketPrice: number = 530;
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

  constructor(private summaryService: SummaryService) {}

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

  setSelectedDate(date: Date) {
    this.selectedDate = date;
  }

  getWeatherData(selectedDestination: string): void {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedDestination}&appid=${this.apiKey}`
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
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.temp_feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);
  }
}
