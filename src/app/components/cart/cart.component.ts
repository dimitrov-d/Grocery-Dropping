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
    db.collection('/cart')
      .valueChanges()
      .subscribe((products) => {
        this.cart_prods = products;
        this.updateTotalPrice(products);
        this.total = products.length;
      });

    db.collection('saved')
      .valueChanges()
      .subscribe((s) => (this.totalSaved = s.length));
  }

  updateTotalPrice(products: any) {
    var current_price = 0;
    for (var i = 0; i < products.length; i++) {
      current_price += products[i].quantity * products[i].price;
    }
    this.totalPrice = current_price;
  }

  cleartCart() {
    this.cart.cleartCart();
  }

  saveOrder() {
    let prods = [];
    this.cart_prods.forEach((prod) => {
      prods.push(prod);
    });

    this.db
      .collection('saved')
      .doc((++this.totalSaved).toString())
      .set({ prods });
    this.updateSavedPrice(prods);
  }

  updateSavedPrice(prods: any[]) {
    var price = 0;
    for (var i = 0; i < prods.length; i++) {
      price += prods[i].price;
    }
    let doc = this.db.collection('saved').doc(this.totalSaved.toString());
    doc.update({ id: this.totalSaved });
    doc.update({ totalPrice: price });
  }
}
