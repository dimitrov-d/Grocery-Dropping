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
  cartItems: Observable<any[]>;
  total: number;
  totalPrice: number;
  cartProds: any[];
  totalSaved: number;

  constructor(private db: AngularFirestore, private cart: CartService) {
    this.cartItems = this.cart.getItems();
    this.cartItems.subscribe((products) => {
      this.cartProds = products;
      this.totalPrice = this.cart.updateTotalPrice(products);
      this.total = products.length;
    });

    db.collection('saved')
      .valueChanges()
      .subscribe((s) => (this.totalSaved = s.length));
  }

  clearCart() {
    this.cart.clearCart();
    this.cartItems = null;
    this.cartProds = null;
  }

  saveOrder() {
    this.cart.saveOrder(this.cartProds, this.totalSaved);
  }
}
