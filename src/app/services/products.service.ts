import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../models/product';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  currentUser: User;
  constructor(
    private toastr: ToastrService,
    private db: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.currentUser = this.authService.currentUserSubject.value || null;
  }

  async toggleHeart(index: number) {
    if (!this.currentUser) {
      this.toastr.error('You must be logged in to continue', 'Error');
      return;
    }

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
}
