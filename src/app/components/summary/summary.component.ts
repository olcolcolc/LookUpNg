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


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  selectedOrigin: string | null = null;
  selectedDestination: string | null = null;
  selectedDate: Date | null = null;
  selectedPassengerCount: number = 0;
  selectedLuggageOption: string | null = null;

    //Icons
    originIcon = faHome;
    dateIcon = faCalendarAlt;
    destinationIcon = faMapMarker;
    passengersIcon = faUser;
    luggageIcon = faSuitcase;
    infoIcon = faInfoCircle;
    weatherData: string | undefined;

  constructor(private summaryService: SummaryService, private weatherService: WeatherService) {}

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

  getWeatherData(): void {
    if (this.selectedDestination) {
      this.weatherService.getWeather(this.selectedDestination).subscribe((data: string) => {
        this.weatherData = data;
        // Możesz tutaj przetworzyć dane pogodowe i wyświetlić je w komponencie
      });
    }
  }

}
