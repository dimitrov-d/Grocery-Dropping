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
    private toastr: ToastrService
  ) {}

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

  completeOrder() {
    this.toastr.success('Order completed, thank you!', 'Success');
    this.cleartCart();
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  updateTotalPrice(products: any) {
    let current_price = 0;
    for (let i = 0; i < products.length; i++) {
      current_price += products[i].quantity * products[i].price;
    }
    return current_price;
  }

  saveOrder(cart_prods, totalSaved: number) {
    const prods = [];
    cart_prods.forEach((prod) => {
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
