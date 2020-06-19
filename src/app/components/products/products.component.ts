import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models/category';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Observable<any[]>;
  categories = Object.values(Category);

  constructor(private db: AngularFirestore) {
    this.products = this.getProducts();
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
    if (category == Category.All) {
      this.products = this.getProducts();
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
}
