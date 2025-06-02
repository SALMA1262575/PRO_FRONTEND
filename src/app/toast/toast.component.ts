import { Component, HostListener } from '@angular/core';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  message: string = '';
  type: 'success' | 'error' | 'info' = 'info';
  isVisible: boolean = false;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe(toast => {
      if (toast) {
        this.message = toast.text;
        this.type = toast.type;
        this.isVisible = true;

        setTimeout(() => {
          this.hide();
        }, toast.duration || 3000);
      }
    });
  }

  hide() {
    this.isVisible = false;
  }
}
