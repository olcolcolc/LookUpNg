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

  // Icons
  originIcon = faHome;
  dateIcon = faCalendarAlt;
  destinationIcon = faMapMarker;
  passengersIcon = faUser;
  luggageIcon = faSuitcase;

  destinations: Destination[] = [];
  selectedDestination: string | null = null;

  constructor(private destinationService: DestinationService) { }

  ngOnInit(): void {
    this.destinationService.getDestinations().subscribe(destinations => {
      this.destinations = destinations;
    });
  }



  onListItemClick(destination: Destination): void {
    this.selectedDestination = destination.desc;
  }
}
