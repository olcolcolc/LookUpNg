import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [
    // Animations for submenu
    trigger('submenuAnimation', [
      state(
        'slide',
        style({
          height: '*',
          opacity: 1,
          transform: 'scaleY(1)',
          transformOrigin: 'top',
        })
      ),
      transition(':enter', [
        style({
          height: '0',
          opacity: 0,
          transform: 'scaleY(0)',
          transformOrigin: 'top',
        }),
        animate('0.3s ease'),
      ]),
      transition(':leave', [
        animate(
          '0.3s ease',
          style({
            height: '0',
            opacity: 0,
            transform: 'scaleY(0)',
            transformOrigin: 'top',
          })
        ),
      ]),
    ]),
  ],
})
export class SelectComponent implements OnInit {
  minDate: Date = new Date();

  // Icons
  originIcon = faHome;
  dateIcon = faCalendarAlt;
  destinationIcon = faMapMarker;
  passengersIcon = faUser;
  luggageIcon = faSuitcase;
  infoIcon = faInfoCircle;

  // Passengers input
  selectedOption_adult: number | undefined;
  selectedOption_children: number | undefined;
  selectedOption_babies: number | undefined;
  passengerOptions: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  passengerCount: number = 0;
  passengersButtonText: string | undefined;

  // Destination input
  destinations: Destination[] = [];
  selectedDestination: string | null = null;
  availableDestinations: Destination[] = [];

  // Origin input
  selectedOrigin: string | null = null;
  availableOrigins: Destination[] = [];

  // Date input
  selectedDate: Date | null = null;

  // Luggage input
  luggageOptions: string[] = ['Carry-on', 'Carry-on & trolley'];
  selectedLuggageOption: string | null = null;

  // Submenus booleans
  isOriginMenuOpen: boolean = false;
  isDestinationMenuOpen: boolean = false;
  isPassengerMenuOpen: boolean = false;
  isLuggageMenuOpen: boolean = false;

  // toastMessage
  @Output() toastMessage: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private destinationService: DestinationService,
    private summaryService: SummaryService,
    @Inject(ToastService) private toastService: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Fetch destinations on component initialization
    this.destinationService.getDestinations().subscribe((destinations) => {
      this.destinations = destinations;
      this.availableOrigins = [...this.destinations];
      this.availableDestinations = [...this.destinations];
    });
  }

  ///// On option click handlers

  // Select Origin handler
  onOriginItemClick(destination: Destination): void {
    this.selectedOrigin = destination.desc;

    // Do not show selected destionation in origin available options
    this.availableDestinations = this.destinations.filter(
      (dest) => dest.desc !== destination.desc
    );
    if (
      this.selectedDestination &&
      this.selectedDestination === destination.desc
    ) {
      this.selectedDestination = null;
    }

    // Send selectedOrigin to summaryService
    this.summaryService.selectedOrigin = destination.desc;

    // Send selectedOrigin to skyscannerService
    this.summaryService.selectedOriginCode = destination.code;

    // Close submenu
    this.isOriginMenuOpen = false;
  }

  // Select Destination handler
  onDestinationItemClick(destination: Destination): void {
    this.selectedDestination = destination.desc;

    // Do not show selected origin in destination available options
    this.availableOrigins = this.destinations.filter(
      (dest) => dest.desc !== destination.desc
    );
    if (this.selectedOrigin && this.selectedOrigin === destination.desc) {
      this.selectedOrigin = null;
    }

    // Send selectedDestination to summaryService
    this.summaryService.selectedDestination = destination.desc;

    // Send selectedDestination to skyscannerService
    this.summaryService.selectedDestinationCode = destination.code;

    // Close submenu
    this.isDestinationMenuOpen = false;
  }

  // Select Luggage handler
  onLuggageItemClick(item: string): void {
    this.selectedLuggageOption = item;

    // Send selectedLuggageOption to summaryService
    this.summaryService.selectedLuggageOption = this.selectedLuggageOption;

    // Close submenu
    this.isLuggageMenuOpen = false;
  }

  // Select Passengers handler
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

    // Check if babies or children without adult
    if (adultCount === 0) {
      if (childrenCount > 0) {
        this.toastService.setWarningMessage('Children cannot fly alone');
      } else if (babiesCount > 0) {
        this.toastService.setWarningMessage('Babies cannot fly alone');
      } else {
        this.toastService.setWarningMessage(
          'At least one adult passenger is required'
        );
      }
      return;
    }

    // Check if babies are less than adults. If not - send toast warning message
    if (babiesCount > adultCount) {
      this.toastService.setWarningMessage(
        'One adult can have at most one infant.'
      );
      return;
    }

    this.selectedOption_adult = adultCount;
    this.selectedOption_children = childrenCount;
    this.selectedOption_babies = babiesCount;
    this.passengerCount = adultCount + childrenCount + babiesCount;

    // Send passengerCount to summaryService
    this.summaryService.selectedPassengerCount = this.passengerCount;

    // Close submenu
    this.isPassengerMenuOpen = false;
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
      !this.selectedOption_adult
    ) {
      this.toastService.setWarningMessage(
        'You have to choose all flight options'
      );
    } else {
      this.authService.loggedIn$.subscribe(async (loggedIn: any) => {
        if (!loggedIn) {
          // Toast message if user is not logged in
          this.toastService.setWarningMessage('You have to log in');
        } else {
          // After logging in
          this.submit.emit();
          this.summaryService.selectedDate = this.selectedDate;
        }
      });
    }
  }

  closeMenus(): void {
    this.isOriginMenuOpen = false;
    this.isDestinationMenuOpen = false;
    this.isPassengerMenuOpen = false;
    this.isLuggageMenuOpen = false;
  }
}
