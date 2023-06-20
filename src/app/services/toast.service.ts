import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastMessageSource = new Subject<string>();
  toastMessage$ = this.toastMessageSource.asObservable();

  setToastMessage(message: string): void {
    this.toastMessageSource.next(message);
  }
}
