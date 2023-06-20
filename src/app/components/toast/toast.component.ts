import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import {
  faCheckCircle,
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
  isMessageWarning: boolean = false;
  isMessageSuccess: boolean = false;

  warningIcon = faExclamationCircle;
  successIcon = faCheckCircle;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.warningMessage$.subscribe(message => {
      this.toastMessage = message;
      this.isMessageWarning = true;
      this.isMessageSuccess = false;
      this.showToast = this.toastMessage !== '';

      // Auto-hide the toast after 5 seconds
      if (this.showToast) {
        setTimeout(() => {
          this.hideToast();
        }, 5000);
      }
    });

    this.toastService.successMessage$.subscribe(message => {
      this.toastMessage = message;
      this.isMessageWarning = false;
      this.isMessageSuccess = true;
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
