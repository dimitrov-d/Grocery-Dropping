import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { FilterService } from 'src/app/services/filter.service';

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
  minPrice: number = 0;
  maxPrice: number = 3;

  constructor(
    private db: AngularFirestore,
    public prodService: ProductsService,
    public filterService: FilterService
  ) {
    this.products = this.filterService.getProducts();
    this.current_categ = Category.All;
  }

  toggleHeart(index) {
    return this.prodService.toggleHeart(index);
  }

  filterByCategory(category) {
    this.current_market = null;
    this.current_categ = category;
    this.products = this.filterService.filterByCategory(category);
  }

  filterByMarket(market) {
    this.current_categ = null;
    this.current_market = market;
    this.products = this.filterService.filterByMarket(market);
  }

  filterProducts(filter: string) {
    this.current_categ = null;
    this.current_market = null;
    this.products = this.filterService.filterByName(filter);
  }

  filterByPrice() {
    this.current_categ = null;
    this.current_market = null;
    this.products = this.filterService.filterByPrice(
      this.minPrice,
      this.maxPrice
    );
  }

  addToCart(product: Product) {
    this.prodService.addToCart(product);
  }
}
