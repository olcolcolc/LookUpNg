import { Component, Input, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/services/summary.service';

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

  constructor(private summaryService: SummaryService) {}

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
}
