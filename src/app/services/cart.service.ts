import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService
  ) {}

  getItems() {
    return this.db.collection('/cart').valueChanges();
  }

  clearCart() {
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

  completeOrder() {
    this.toastr.success('Order completed, thank you!', 'Success');
    this.clearCart();
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  updateTotalPrice(products: any) {
    let currentPrice = 0;
    for (let i = 0; i < products.length; i++) {
      currentPrice += products[i].quantity * products[i].price;
    }
    return currentPrice;
  }

  saveOrder(cartProds, totalSaved: number) {
    const prods = [];
    cartProds.forEach((prod) => {
      prods.push(prod);
    });

    this.db
      .collection('saved')
      .doc((++totalSaved).toString())
      .set({ prods });
    this.updateSavedPrice(prods, totalSaved);
    this.toastr.success('Order successfully saved', 'Done');
  }

  updateSavedPrice(prods: any[], totalSaved: number) {
    let price = 0;
    for (let i = 0; i < prods.length; i++) {
      price += prods[i].price * prods[i].quantity;
    }
    const doc = this.db.collection('saved').doc(totalSaved.toString());
    doc.update({ id: totalSaved, totalPrice: price });
  }
}
