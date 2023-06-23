import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  selectedOrigin: string | null = null;
  selectedDestination: string | null = null;
  selectedDate: Date | null = null;
  selectedPassengerCount: number = 0;
  selectedLuggageOption: string | null = null;
  cheapestTicketOption: number | undefined;

  setSelectedDate(date: Date) {
    this.selectedDate = date;
  }
}
