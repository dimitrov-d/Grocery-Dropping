import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Observable<any[]>;
  categories = Object.values(Category);
  current_categ: string;
  currentUser: User;

  constructor(
    private db: AngularFirestore,
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {
    this.products = this.getProducts();
    this.current_categ = Category.All;
    this.currentUser = this.authService.currentUserSubject.value || null;
  }

  async toggleHeart(index) {
    if (!this.currentUser) {
      this.toastr.error('You must be logged in to continue!', 'Error');
      return;
    }
    let docRef = this.db.collection('/products').doc(index.toString());
    let data = (await docRef.get().toPromise()).data();
    this.db
      .collection('/products')
      .doc(index.toString())
      .update({ favorited: !data.favorited });
  }

  filterByCategory(category) {
    this.current_categ = category;
    if (category == Category.All) {
      this.products = this.getProducts();
    } else if (category == Category.Favorites) {
      this.products = this.products = this.db
        .collection('/products', (prod) => prod.where('favorited', '==', true))
        .valueChanges();
    } else {
      this.products = this.db
        .collection('/products', (prod) =>
          prod.where('category', '==', category)
        )
        .valueChanges();
    }
  }

  filterProducts(filter: string) {
    if (!filter) {
      this.products = this.getProducts();
    } else {
      this.products = this.db
        .collection('/products', (prod) => prod.where('name', '==', filter))
        .valueChanges();
    }
  }

  getProducts() {
    return this.db.collection('/products').valueChanges();
  }

  addToCart(product: Product) {
    if (!this.currentUser) {
      this.toastr.error('You must be logged in to continue!', 'Error');
      return;
    }

    let data = {
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
