import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  currentUser: User;
  constructor(
    private toastr: ToastrService,
    private db: AngularFirestore
  ) {
  }

  async toggleHeart(index: number) {
    const docRef = this.db.collection('/products').doc(index.toString());
    const data = (await docRef.get().toPromise()).data();
    this.db
      .collection('/products')
      .doc(index.toString())
      .update({ favorited: !data.favorited });
  }

  addToCart(product: Product) {
    if (!this.currentUser) {
      this.toastr.error('You must be logged in to continue!', 'Error');
      return;
    }

    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      imgUrl: product.imgUrl,
      quantity: 1,
    };

    this.db.collection('/cart').doc(product.id.toString()).set(data);
    this.toastr.success(product.name + ' successfully added to cart', 'Done');
  }

  error(message) {
    this.toastr.error(message, 'Error');
  }
}
