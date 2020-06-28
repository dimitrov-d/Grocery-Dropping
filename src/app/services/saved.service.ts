import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SavedService {
  constructor(private db: AngularFirestore, private toastr: ToastrService) {}

  addOrderToCart(index: number) {
    this.db
      .collection('/saved')
      .doc(index.toString())
      .valueChanges()
      .subscribe((x: any) => {
        const products: any[] = x.prods;
        products.forEach((prod) => this.addToCart(prod));
      });
    this.toastr.success('Order successfully added to cart', 'Done');
  }

  deleteOrder(index: number) {
    this.db.collection('/saved').doc(index.toString()).delete();
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
