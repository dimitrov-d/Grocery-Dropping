import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart_items: Observable<any[]>;
  total: number;
  totalPrice: number;
  cart_prods: any[];
  totalSaved: number;

  constructor(private db: AngularFirestore, private cart: CartService) {
    this.cart_items = this.cart.getItems();
    this.cart_items.subscribe((products) => {
      this.cart_prods = products;
      this.totalPrice = this.cart.updateTotalPrice(products);
      this.total = products.length;
    });

    db.collection('saved')
      .valueChanges()
      .subscribe((s) => (this.totalSaved = s.length));
  }

  cleartCart() {
    this.cart.cleartCart();
  }

  saveOrder() {
    this.cart.saveOrder(this.cart_prods, this.totalSaved);
  }
}
