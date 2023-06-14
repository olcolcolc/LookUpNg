import { Component, OnInit } from '@angular/core';
import { faHome, faCalendarAlt, faMapMarker, faUser, faSuitcase,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { DestinationService } from '../../services/destination.service';
import { Destination } from 'src/app/interfaces/destination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  minDate: Date = new Date();

  //Icons
  originIcon = faHome;
  dateIcon = faCalendarAlt;
  destinationIcon = faMapMarker;
  passengersIcon = faUser;
  luggageIcon = faSuitcase;
  infoIcon = faInfoCircle;

  //Passengers input
  selectedOption_adult: number | undefined;
  selectedOption_children: number | undefined;
  selectedOption_babies: number | undefined;
  passengerOptions: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  //Destination input
  destinations: Destination[] = [];
  selectedDestination: string | null = null;

  //Origin input
  selectedOrigin: string | null = null;

  //Submenus config
  isOriginMenuOpen: boolean = false;
  isDestinationMenuOpen: boolean = false;
  isPassengerMenuOpen: boolean = false;
  isLuggageMenuOpen: boolean = false;


  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.destinationService.getDestinations().subscribe(destinations => {
      this.destinations = destinations;
    });
  }

  onOriginItemClick(destination: Destination): void {
    this.selectedOrigin = destination.desc;
    this.isOriginMenuOpen = false;
  }

  onDestinationItemClick(destination: Destination): void {
    this.selectedDestination = destination.desc;
  }

  onListItemClick(destination: Destination): void {
    this.selectedDestination = destination.desc;
  }

  //Submenus handlers
  toggleOriginMenu(): void {
    this.isOriginMenuOpen = !this.isOriginMenuOpen;
  }

  toggleDestinationMenu(): void {
    this.isDestinationMenuOpen = !this.isDestinationMenuOpen;
  }

  togglePassengerMenu(): void {
    this.isPassengerMenuOpen = !this.isPassengerMenuOpen;
  }

  toggleLuggageMenu(): void {
    this.isLuggageMenuOpen = !this.isLuggageMenuOpen;
  }


  //Close submenus handlers
  closeOriginMenu(): void {
    this.isOriginMenuOpen = false;
  }

  closeDestinationMenu(): void {
    this.isDestinationMenuOpen = false;
  }
}
