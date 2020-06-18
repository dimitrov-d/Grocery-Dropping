import { Component, OnInit } from '@angular/core';
import { products } from '../../../assets/products';
import { Product } from 'src/app/models/product';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Observable<any[]>;
  categories = [
    'All Categories',
    'Bread',
    'Dairy',
    'Fruits',
    'Vegetables',
    'Favorites',
  ];
  constructor(private db: AngularFirestore) {
    this.products = db.collection('/products').valueChanges();
  }

  ngOnInit() {}

  async toggleHeart(index) {
    let docRef = this.db.collection('/products').doc(index.toString());
    let data = (await docRef.get().toPromise()).data();
    this.db
      .collection('/products')
      .doc(index.toString())
      .update({ favorited: !data.favorited });
  }

  filterByCategory(category) {
    switch (category) {
      case 'All Categories': {
        this.products = this.db.collection('/products').valueChanges();
        break;
      }
      case 'Favorites': {
        this.products = this.db
          .collection('/products', (prod) =>
            prod.where('favorited', '==', 'true')
          )
          .valueChanges();
        break;
      }
    }
  }

  filterProducts(filter: string) {
    this.products = this.db.collection('/products').valueChanges();
  }
}
