import { Component, OnInit } from '@angular/core';
import { faHome, faCalendarAlt, faMapMarker, faUser, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { DestinationService } from '../../services/destination.service';
import { Destination } from 'src/app/interfaces/destination';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  minDate: Date = new Date();
  originIcon = faHome;
  dateIcon = faCalendarAlt;
  destinationIcon = faMapMarker;
  passengersIcon = faUser;
  luggageIcon = faSuitcase;

  destinations: Destination[] = [];
  selectedDestination: string | null = null;

  isOriginMenuOpen: boolean = false;
  isDestinationMenuOpen: boolean = false;

  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.destinationService.getDestinations().subscribe(destinations => {
      this.destinations = destinations;
    });
  }

  onListItemClick(destination: Destination): void {
    this.selectedDestination = destination.desc;
  }

  toggleOriginMenu(): void {
    this.isOriginMenuOpen = !this.isOriginMenuOpen;
    console.log("origin menu open")
  }

  toggleDestinationMenu(): void {
    this.isDestinationMenuOpen = !this.isDestinationMenuOpen;
  }

  closeOriginMenu(): void {
    this.isOriginMenuOpen = false;
  }

  closeDestinationMenu(): void {
    this.isDestinationMenuOpen = false;
  }
}
