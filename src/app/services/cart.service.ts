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
}
