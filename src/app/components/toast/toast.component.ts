import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import {
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})

export class ToastComponent implements OnInit {
  toastMessage: string = '';
  showToast: boolean = false;

  warningIcon = faExclamationCircle;


  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastMessage$.subscribe(message => {
      this.toastMessage = message;
      this.showToast = this.toastMessage !== '';
      // Auto-hide the toast after 5 seconds
      if (this.showToast) {
        setTimeout(() => {
          this.hideToast();
        }, 5000);
      }
    });
  }

  hideToast(): void {
    this.showToast = false;
  }
}
