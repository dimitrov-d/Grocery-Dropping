import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Observable<any[]>;
  categories = Object.values(Category);
  current_categ: string;

  constructor(private db: AngularFirestore) {
    this.products = this.getProducts();
    this.current_categ = Category.All;
  }

  async toggleHeart(index) {
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
    let data = {
      id: product.id,
      name: product.name,
      price: product.price,
      imgUrl: product.imgUrl,
      quantity: 1,
    };

    this.db.collection('/cart').doc(product.id.toString()).set(data);
  }
}
