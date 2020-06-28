import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  pickup = false;
  text = 'Please choose your desired option of order receival';
  myDate: any;
  date: Object;
  constructor(private cart: CartService) {
    const currentTime = new Date();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const year = currentTime.getFullYear();
    this.date = { year, month, day };
  }

  ngOnInit() {}

  setPickup() {
    this.pickup = true;
    this.text =
      'Please choose when you would like your products to be ready for pickup';
  }

  done() {
    this.cart.completeOrder();
  }
}
