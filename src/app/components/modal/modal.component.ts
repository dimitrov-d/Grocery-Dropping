import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  pickup = false;
  text = 'Please choose your desired option of order receival';
  myDate: any;
  dateSelected = false;
  minDate: Object;

  constructor(private cart: CartService) {
    const currentTime = new Date();
    const month = currentTime.getMonth() + 1;
    var day; // Check if current day is a weekend
    if (currentTime.getDay() == 0) {
      day = currentTime.getDate() + 1;
    } else if (currentTime.getDay() == 6) {
      day = currentTime.getDate() + 2;
    } else {
      day = currentTime.getDate();
    }
    const year = currentTime.getFullYear();
    this.minDate = { year, month, day };
  }

  setPickup() {
    this.pickup = true;
    this.text =
      'Please choose when you would like your products to be ready for pickup';
  }

  done() {
    if (!this.dateSelected) {
      this.cart.toastr.error('Please choose a date', 'Error');
      return;
    }
    this.cart.completeOrder();
  }

  dateIsSelected() {
    this.dateSelected = true;
  }
}
