import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Observable<any[]>;
  categories = Object.values(Category);
  current_categ: string;
  current_market: string;
  markets = ['Hofer', 'Lidl', 'Mercator'];

  constructor(
    private db: AngularFirestore,
    public prodService: ProductsService
  ) {
    this.products = this.getProducts();
    this.current_categ = Category.All;
  }

  toggleHeart(index) {
    return this.prodService.toggleHeart(index);
  }

  filterByCategory(category) {
    if (category === Category.All) {
      this.products = this.getProducts();
    } else if (category === Category.Favorites) {
      if (!this.prodService.authorizeFavorites()) return;
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
        this.current_market = null;
        this.current_categ = category;

  }

  filterByMarket(market) {
    this.current_categ = null;
    this.current_market = market;
    this.products = this.db
      .collection('/products', (prod) =>
        prod.where('supermarket', '==', market)
      )
      .valueChanges();
  }

  filterProducts(filter: string) {
    if (!filter) {
      this.products = this.getProducts();
    } else {
      this.products = this.db
        .collection(
          '/products',
          (prod) =>
            prod
              .where('name', '>=', filter)
              .where('name', '<=', filter + '\uf8ff') // Unicode range to be able to search by substring
        )
        .valueChanges();
    }
  }

  getProducts() {
    return this.db.collection('/products').valueChanges();
  }

  addToCart(product: Product) {
    this.prodService.addToCart(product);
  }
}
