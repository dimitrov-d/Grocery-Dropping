import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart_items: Observable<any[]>;
  total: number;
  totalPrice: number;

  constructor(private db: AngularFirestore) {
    this.cart_items = this.getItems();
    db.collection('/cart')
      .valueChanges()
      .subscribe((products) => {
        this.updateTotalPrice(products);
        this.total = products.length;
      });
  }

  getItems() {
    return this.db.collection('/cart').valueChanges();
  }

  updateTotalPrice(products: any) {
    var current_price = 0;
    for (var i = 0; i < products.length; i++) {
      current_price += products[i].quantity * products[i].price;
    }
    this.totalPrice = current_price;
  }
}
