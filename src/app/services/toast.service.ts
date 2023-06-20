import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  isWarningMessage(toastMessage: string) {
    throw new Error('Method not implemented.');
  }
  private warningMessageSource = new Subject<string>();
  private successMessageSource = new Subject<string>();

  warningMessage$ = this.warningMessageSource.asObservable();
  successMessage$ = this.successMessageSource.asObservable();

  setWarningMessage(message: string): void {
    this.warningMessageSource.next(message);
  }

  setSuccessMessage(message: string): void {
    this.successMessageSource.next(message);
  }
}
