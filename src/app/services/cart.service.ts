import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private db: AngularFirestore) {}

  getItems() {
    return this.db.collection('/cart').valueChanges();
  }

  cleartCart() {
    this.db
      .collection('cart')
      .get()
      .toPromise()
      .then((res) => {
        res.forEach((product) => {
          product.ref.delete();
        });
      });
  }
}
