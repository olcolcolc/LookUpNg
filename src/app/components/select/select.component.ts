import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import {
  faHome,
  faCalendarAlt,
  faMapMarker,
  faUser,
  faSuitcase,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { DestinationService } from '../../services/destination.service';
import { Destination } from 'src/app/interfaces/destination';
import { SummaryService } from 'src/app/services/summary.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
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
  passengerCount: number = 0;
  passengersButtonText: string | undefined;

  //Destination input
  destinations: Destination[] = [];
  selectedDestination: string | null = null;
  availableDestinations: Destination[] = [];

  //Origin input
  selectedOrigin: string | null = null;
  availableOrigins: Destination[] = [];

  //Date input
  selectedDate: Date | null = null;

  //Luggage input
  luggageOptions: string[] = ['Carry-on', 'Carry-on & trolley'];
  selectedLuggageOption: string | null = null;

  //Submenus booleans
  isOriginMenuOpen: boolean = false;
  isDestinationMenuOpen: boolean = false;
  isPassengerMenuOpen: boolean = false;
  isLuggageMenuOpen: boolean = false;

  //toastMessage
  @Output() toastMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private destinationService: DestinationService,
    private summaryService: SummaryService,
    private toastService: ToastService) {}

  ngOnInit(): void {
    this.destinationService.getDestinations().subscribe((destinations) => {
      this.destinations = destinations;
      this.availableOrigins = [...this.destinations];
      this.availableDestinations = [...this.destinations];
    });
  }

  // On option click handlers
  onOriginItemClick(destination: Destination): void {
    this.selectedOrigin = destination.desc;
    this.isOriginMenuOpen = false;

    //do not show selected destionation in origin available options
    this.availableDestinations = this.destinations.filter(
      (dest) => dest.desc !== destination.desc
    );
    if (
      this.selectedDestination &&
      this.selectedDestination === destination.desc
    ) {
      this.selectedDestination = null;
    }

    //send selectedOrigin to summaryService
    this.summaryService.selectedOrigin = destination.desc;
    }

  onDestinationItemClick(destination: Destination): void {
    this.selectedDestination = destination.desc;
    this.isDestinationMenuOpen = false;

    //do not show selected origin in destination available options
    this.availableOrigins = this.destinations.filter(
      (dest) => dest.desc !== destination.desc
    );
    if (this.selectedOrigin && this.selectedOrigin === destination.desc) {
      this.selectedOrigin = null;
    }

    //send selectedDestination to summaryService
    this.summaryService.selectedDestination = destination.desc;
  }

  onLuggageItemClick(item: string): void {
    this.selectedLuggageOption = item;
    this.isLuggageMenuOpen = false;

    //send selectedLuggageOption to summaryService
    this.summaryService.selectedLuggageOption = this.selectedLuggageOption;
  }

  onAcceptPassengerSelection(): void {
    const adultCount = this.selectedOption_adult
      ? parseInt(this.selectedOption_adult.toString(), 10)
      : 0;
    const childrenCount = this.selectedOption_children
      ? parseInt(this.selectedOption_children.toString(), 10)
      : 0;
    const babiesCount = this.selectedOption_babies
      ? parseInt(this.selectedOption_babies.toString(), 10)
      : 0;

    this.passengerCount = adultCount + childrenCount + babiesCount;
    this.isPassengerMenuOpen = false;

    //send passengerCount to summaryService
    this.summaryService.selectedPassengerCount = this.passengerCount;
  }

  getSelectedPassengerCount(): number {
    return this.passengerCount;
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

  //Submit button handler
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();

  onSubmit() {
    if (
      !this.selectedOrigin ||
      !this.selectedDestination ||
      !this.selectedDate ||
      !this.selectedLuggageOption ||
      !this.selectedOption_adult ||
      !this.selectedOption_children ||
      !this.selectedOption_babies
    ) {
      this.toastService.setWarningMessage('You have to choose all flight options');
      console.log("toast send to service")
        } else {
      this.submit.emit();
      this.summaryService.selectedDate = this.selectedDate; //send date to summary service
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Sprawdzenie czy kliknięcie nastąpiło poza submenu
    if (
      !this.isDescendantOfElement(targetElement, 'selectContainer__originBtn') &&
      !this.isDescendantOfElement(targetElement, 'selectContainer__origin__submenu') &&
      !this.isDescendantOfElement(targetElement, 'selectContainer__destinationBtn') &&
      !this.isDescendantOfElement(targetElement, 'selectContainer__destination__submenu') &&
      !this.isDescendantOfElement(targetElement, 'selectContainer__passengersBtn') &&
      !this.isDescendantOfElement(targetElement, 'selectContainer__passengers__submenu') &&
      !this.isDescendantOfElement(targetElement, 'selectContainer__luggageBtn') &&
      !this.isDescendantOfElement(targetElement, 'selectContainer__luggage__submenu')
    ) {
      this.isOriginMenuOpen = false;
      this.isDestinationMenuOpen = false;
      this.isPassengerMenuOpen = false;
      this.isLuggageMenuOpen = false;
    }
  }

  // Sprawdzenie czy element lub jego przodkowie mają określony klasę
  private isDescendantOfElement(element: HTMLElement, className: string): boolean {
    let currentElement: HTMLElement | null = element;

    while (currentElement !== null && currentElement.tagName !== 'HTML') {
      if (currentElement.classList.contains(className)) {
        return true;
      }
      currentElement = currentElement.parentElement;
    }

    return false;
  }


}
