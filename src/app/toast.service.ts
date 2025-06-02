import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  
  // Observable pour écouter les messages
  toast$: Observable<ToastMessage | null> = this.toastSubject.asObservable();

  // Méthodes pour afficher les toasts
  showSuccess(message: string, duration: number = 3000) {
    this.toastSubject.next({ text: message, type: 'success', duration });
  }

  showError(message: string, duration: number = 5000) {
    this.toastSubject.next({ text: message, type: 'error', duration });
  }

  showInfo(message: string, duration: number = 3000) {
    this.toastSubject.next({ text: message, type: 'info', duration });
  }

  hideToast() {
    this.toastSubject.next(null);
  }
}