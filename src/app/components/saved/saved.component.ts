import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css'],
})
export class SavedComponent {
  saved_items: Observable<any[]>;
  savedTotal: number;

  constructor(private db: AngularFirestore) {
    this.saved_items = this.db.collection('/saved').valueChanges();
    this.saved_items.subscribe((saved) => {
      this.savedTotal = saved.length;
    });
  }

  deleteOrder(index: number) {
    this.db.collection('/saved').doc(index.toString()).delete();
  }

  addOrderToCart(index: number) {
    this.db
      .collection('/saved')
      .doc(index.toString())
      .valueChanges()
      .subscribe((x: any) => {
        let products: any[] = x.prods;
        products.forEach((prod) => this.addToCart(prod));
      });
  }

  addToCart(product) {
    this.db.collection('/cart').doc(product.id.toString()).set(product);
  }

  clearOrders() {
    this.db
      .collection('/saved')
      .get()
      .toPromise()
      .then((res) => {
        res.forEach((order) => {
          order.ref.delete();
        });
      });
  }
}
