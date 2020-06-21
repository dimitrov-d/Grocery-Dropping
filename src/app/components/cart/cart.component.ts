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

  constructor(private db: AngularFirestore) {
    this.cart_items = this.getItems();
    db.collection('/cart')
      .valueChanges()
      .subscribe((result) => {
        this.total = result.length;
      });
  }

  getItems() {
    return this.db.collection('/cart').valueChanges();
  }

}
